---
layout: post
title: 'Introducing Stone: A database for game consoles and their controllers.'
date: 2017-06-09
path: /blog/introducing-stone
categories: 
  - stone
---

[![Stone](https://stone.snowflakepowe.red/static/media/fulllogo.5429c7b6.svg)](https://stone.snowflakepowe.red/#/)

When I first started writing Snowflake, one of the things I was concerned with was how to refer internally to different game consoles. This wasn't an issue exclusive to Snowflake; databases like TheGamesDB and OpenVGDB all have different identifiers for different consoles. 

[Stone](https://stone.snowflakepowe.red/#/) originally started out as a more normalised way to identify individual consoles. I wasn't happy with numeric, "black-box" identifiers (the NES is platform #`21` according to the GiantBomb API!), or human readable, but hard to parse strings like how TheGamesDB likes to use, `Nintendo Entertainment System (NES)`. OpenVGDB does have "OEID"s like `openemu.system.psx`, but they aren't use anywhere else in the database, preferring to use the numeric system ID internally instead (`38` for the Playstation).

If I were to use a new set of identifiers, they would have to be 

1. Human readable
2. Short and concise
3. Obvious

With #3 being the most important of all. With those criteria in mind, the very first iteration of "Stone", was simply a list of identifiers for all consoles that were once, or are currently on the market. Instead of `21`, the NES would be known as `NINTENDO_NES`, the Sega Genesis as `SEGA_GEN`, so on and so forth. It was obvious, unique, and with the lack of spaces and other frivolous punctuation, minimised the amount of possible bugs just for parsing identifiers.

That was fine and all, and identifiers are one of the most important parts of _Stone_ as a whole. But those of you that have been following Snowflake's development know of a peculiar feature, [heuristic scraping](https://snowflakepowe.red/heuristic-scraping/). Snowflake is able to, by examining the file signatures of different ROMs and ISO files, reasonably determine what game console (I'm going to refer to a '*game console'* as a '*platform*', to use Stone terminology from here onwards) that file is a game of. 

Again, originally this was a very simple affair. Simply check the file, and tell the scraper the identifier of the platform. But as the scraping pipeline got increasingly complex, it began to make sense to sort out each file not just by platform, but also by file type. 

Some files, like `.nes` files can be hashed quickly and easily. Other files like Wii `.wbfs` files probably would take a while to hash, but conveniently have a unique ID in their header. Snowflake's [record based database](https://snowflakepowe.red/progress-report-may-2017/) also makes this a requirement; since there could be multiple files associated with one game, there has to be a way to tell apart image files like cover art, and the actual game binaries, and files like cuesheets and GDIs. Snowflake also needed a way to specify if a certain file was in a zip archive, as many emulators support running ROMs inside ZIP files.

Thankfully, there already exists a mechanism to identify file types called a "Media Type", or a "Content Type", also known as a "mimetype". For every file type I could find for every console that could even relate to running a game, a unique content type was given to the file type. For example, your humble `.nes` file can be referred to as the content type `application/vnd.stone-romfile.nintendo.nes-ines`. A bit lengthy, but descriptive, and no one really minds long content types. 

These content types are probably one of Stone's biggest advantages when it comes to emulation and emulator frontends. Having a unique way to refer to a certain file type makes certain things very easy, especially if the frontend or emulator is a multi-system emulator. `.bin` by itself is hardly descriptive of anything, but `application/vnd.stone-romfile.sony.psx-discimage` makes it obvious that it is a Playstation 1 disc image. I don't think anyone has attempted to give standardised content types to ROM and ISO files (especially since there are so many varieties of files that are called 'ISO' files), and Stone assigns them in a [standard, consistent, and descriptive manner as well](https://stone.snowflakepowe.red/#/spec/platforms).

On the issue of emulation, Stone also describes known hashes and common file names for the BIOS files required for many platforms. This allows possible frontends to check for the presence and integrity of such BIOS files to be able to properly notify the user if an emulator does not work. Much of this data was assembled from sources across the internet, and Stone brings it all together into a neat package.

Stone also has support for arbitrary metadata for platforms. Many frontends put metadata in some closed database, if they even bother at all.  Stone can act as a source of metadata for platforms, including information such as release date, company, abbreviations, and of course, a human readable Friendly Name. Along with everything previously mentioned, this metadata is specified in a *platform definition* that forms the core of Stone. A definition is simply a parsable description of a platform including all its identifier, file types, BIOS files, and metadata. I encourage everyone to continue to add to this metadata for as many platforms as you can by checking out the [definitions](https://stone.snowflakepowe.red/#/defs/platforms), and making edits on GitHub!

Besides content types and BIOS files, Stone also describes the layout of various platforms controllers, in *controller layout definitions*. While the *platforms definitions* were created in hopes of being useful to not only Snowflake, but other frontends and databases, the *controller layout definitions* may admittedly be less useful. They were created originally for Snowflake's on-the-fly [input configuration generation](https://snowflakepowe.red/input-pipeline/) feature, but since this data had not been compiled online anywhere else in any useful form, I've decided to include this data in hopes that it could be useful to someone else for some project. 

The *controller layout definition* specifies the layout of inputs on a controller for a certain platform. Probably the harder-to-understand section of Stone, every possible input on a conventional controller is [given a name and semantic meaning](https://stone.snowflakepowe.red/#/spec/controllers), called an *element*. Elements that exist on a given controller are listed out, for example, the NES controller has a `ButtonA`, a `ButtonB`, `ButtonStart`, and `ButtonSelect`, as well as the 4 D-pad directions `DirectionalN`, `DirectionalE`, `DirectionalS`, and `DirectionalW`. The *element* is then given a *type*, which specifies that the `ButtonA`, for example, is really a `Button`. A label is also given to match what the button would be called originally, for example, `ButtonA` is labeled "Cross", for human readability.

The theory behind these layers of abstraction is that *any possible button* on the hardware controller, meaning the input device the user is holding, can map to any other *element* with the type of `Button`. For example, the user could map the A button on their XBOX 360 controller to a B button on their emulated NES controller. While this is mostly an implementation detail on Snowflake's end, it has the benefit of describing exactly the layout of many controllers in a computer-readable way. While the information itself is widespread, I believe Stone is the first time it has been made available in an easy to parse manner. 

I'm sure that Stone fills an extremely small niche, and many of you reading this probably kept in mind a certain black and white webcomic about so-called "standards". But while Stone has certainly been useful for me, I'm publishing this under the MIT license in hopes it will be useful for others as well. Contributions are always welcome, be it adding a missing platform (Stone covers a lot, but hardly all), or more metadata. Read through the docs and explore the definitions at the [Stone website](https://stone.snowflakepowe.red/#/). I'm aiming for Stone to be the OpenVGDB, not for games, for consoles and controllers, a source of data for all to use in their own projects.
