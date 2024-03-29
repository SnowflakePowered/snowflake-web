---
layout: post
title: Snowflake Developer Roundup - August 2015
path: /blog/dev-report-august-2015
categories:
  - archive
  - progress_report
date: 2015-08-13
---

There have been some major changes to the Snowflake API since I've done a developer-oriented devlog. The good news is, now that all these big changes have been done, there aren't any more huge overhauls planned (except maybe the [removal of the entire IIdentifier API](https://github.com/SnowflakePowered/snowflake/issues/142) ), so it is now safe to work with Snowflake's API to build and extend your frontend. **The following is a wall of text that may be technical-sounding and regards the inner workings of Snowflake. Read on if you want to learn how to make plugins or themes**. To get started with Snowflake,
you can get what you need to get set up at [NuGet](https://www.nuget.org/packages/Snowflake) and [npm](https://www.npmjs.com/package/snowflake.js). Offline documentation is available for download at [AppVeyor](https://ci.appveyor.com/project/RonnChyran/snowflake/build/artifacts).

#### Make snowflake.js requests respond with useful objects
For themers, [[PR #132](https://github.com/SnowflakePowered/snowflake/pull/132)] makes `snowflake.setFlagValues` return all the new values, so you don't have to make an extra call to `snowflake.getFlagValues`. [[PR #156](https://github.com/SnowflakePowered/snowflake/pull/156)] makes all JSAPI methods that used to return a status string return the object that was manipulated so you can use it right after. Unfortunately I still have to get on the documentation for `snowflake.js` and `Snowflake.StandardAjax`, so I apologize for that if you wanted to make a theme. You can look at [theme-paper-snowflake](https://github.com/SnowflakePowered/theme-paper-snowflake) to see how to interact with the Snowflake JSAPI to make themes.

#### C# 6.0 features
Most importantly, [[PR #154](https://github.com/SnowflakePowered/snowflake/pull/154)] upgrades Snowflake to use C# 6.0 features, as well as doing some code-cleanup. This means you will need [Visual Studio 2015](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx) to develop with Snowflake. Around the same time I've also [[PR #152](https://github.com/SnowflakePowered/snowflake/pull/152)] cleaned up and improved documentation. Documentation is now available in both [Sandcastle and Doxygen formats](https://ci.appveyor.com/project/RonnChyran/snowflake/build/artifacts). Doxygen provides some more information into the concrete implementations of some interfaces, but Sandcastle looks a lot more nicer.

#### Proper entry point on Windows
[[PR #126](https://github.com/SnowflakePowered/snowflake/pull/126)] Introduces a proper entry-point on Windows rather than the hacky Core.Init. I'm planning to extend this with a simple socket command interface (something basic like "`SHUTDOWN`/`RESTART`/`INSTALLPLUGINS`") so the theme can communicate with it's host. Plugin installation will also be handled by the shell; plugins will be packaged in a simple ZIP compressed format with a manifest, and the shell will simply install whatever is placed into a staging folder.

#### Flexible events framework
One of the major overhauls in the API is with [[PR #134](https://github.com/SnowflakePowered/snowflake/pull/134)] the events API. Rather than a set list of events that can't be extendable, the new Events API acts like a dependency-injection container. You register the event type with the `SnowflakeEventsManager.EventSource`, which persists indefinitely throughout the lifetime of the application, and you can raise and subscribe to the event as long as the plugin has knowledge of the EventArgs's Type. This makes it much more flexible and exposes a service for plugins to use.

#### Better plugin utilities
Speaking of plugins, [[PR #128](https://github.com/SnowflakePowered/snowflake/pull/128)] and [[PR #147](https://github.com/SnowflakePowered/snowflake/pull/147)] introduce new utility features for plugins to use. Plugins can now clean up on unload by overriding `Dispose()` as per .NET conventions, and access a logger object at `this.Logger`. `IPluginConfigurationOption` hasn't been implemented yet, but will be a way for themes to access and change plugin options, basically a shim for an `IPluginConfiguration` object.

#### EmulatorBridge improvements
There are a lot of breaking changes that involve `IEmulatorBridge`, in order to make writing bridges and adapters much easier. [[PR #149](https://github.com/SnowflakePowered/snowflake/pull/149)] (sorry for the messy commit history) splits off super-long single time templates into their own files, because JSON doesn't like multi-line strings. I find this is much more easier to work with rather than having strings with `\r\n` scattered literally everywhere, simply name the template the same as the configuration ID, and save it as an embedded resource. Most importantly, [[PR #159](https://github.com/SnowflakePowered/snowflake/pull/159)] inserts the `IGameInfo` game object into all the `CompileConfiguration` and `CompileController` overloads. This allows plugins to conditionally compile configuration files based on the game and the game's flags. This allows things like selecting which [Wii Remote extension to use](https://github.com/SnowflakePowered/emulator-DolphinBridge/blob/master/DolphinBridge.Stable.Five/resource/flags.json#L3) by a configuration flag.

#### Controller compilation improvements
 [[PR #144](https://github.com/SnowflakePowered/snowflake/pull/144)] adds mouse support to `IKeyboardMapping`, so any `input.json` files will have to be updated to accommodate the new `MOUSE_*` keys. [[PR #121](https://github.com/SnowflakePowered/snowflake/pull/121)] greatly simplifies controller compilation. Instead of having to map each profile to a controller definition, and to a device, `GamepadAbstraction` provides a RetroArch or HTML5-like model of a unified virtual gamepad modeled on an XInput controller. Instead of getting the profile for the controller for the device, you can simply get the `GamepadAbstraction` for the device, and everything is automatically [mapped together by the controller definition](https://github.com/SnowflakePowered/snowflake-controllers).

#### Getting Started
You can get what you need to get set up at [NuGet](https://www.nuget.org/packages/Snowflake) and [npm](https://www.npmjs.com/package/snowflake.js). Offline documentation is available for download at [AppVeyor](https://ci.appveyor.com/project/RonnChyran/snowflake/build/artifacts). To reiterate, the Plugin, Events and StandardAjax (snowflake.js) APIs are essentially stable now and won't have any more breaking changes  unless something big happens, but please do be aware that Snowflake is still technically in code-churn so do look out for any breaking PRs that are to be merged by starring the [GitHub page](https://github.com/SnowflakePowered/snowflake). If you need any help with understanding the API, contact me through [reddit](reddit.com/u/ron975) or by email at [ronny@ronnchyran.com](mailto:ronny@ronnchyran.com).
