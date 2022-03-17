---
title: "Announcing shiragame 3.0: A comprehensive and versioned game attestation database."
date: 2021-03-11
categories:
  - annoucement
  - library
layout: post
path: /blog/announcing-shiragame-3-0
---
![banner](https://shiragame.snowflakepowe.red/logo.svg)

shiragame is a game attestation database that collects information from No-Intro, Redump, TOSEC, and more and consolidates it into a redistributable SQLite database with a [fully specified and semantically versioned schema](https://github.com/SnowflakePowered/shiratsu/blob/master/SPECIFICATION.md). shiragame is updated on a roughly weekly basis to keep up with the newest information.

I've recently updated the specification to version 3.0 with a few improvements and more information sources.

* A [new file name parser](https://docs.rs/shiratsu-naming/0.1.2/shiratsu_naming/), `shiratsu-naming` that no longer relies on regular expressions. The new name parser is able to handle more edge cases than the old regular-expression based parser, and has been rewritten to be faster and more general purpose for building DAT checking tools.
    * Whereas the old regex-based parser discarded information irrelevant to shiragame, the new parser tokenizes every flag according to the convention for each supported naming convention, tested on a large set of names every week!
* Added a new database column to indicate whether a file is a BIOS or system file or not.
    * This may be slightly unreliable since it relies on naming conventions, but a non-system file should not be marked as a system file. Some system or BIOS files might not be marked properly though.
* Added [dats.site Custom DATs](https://dats.site/custom_system_datslist.php) as a new source.
* Added [OpenGood](https://github.com/SnowflakePowered/opengood) as a new source to include GoodTools names and hashes.
  * OpenGood is a set of freely distributable XML DAT files that catalogue the known dumped names and hashes from the last release of GoodTools for historical purposes.
* Added entries for the [Watara Supervision](https://stone.snowflakepowe.red/#/defs/platforms/WATARA_SV).

With every release of shiragame, logs are included that certify the DAT files that were used to build the release database. It does not catalogue all games, only platforms specified by the [Stone](https://stone.snowflakepowe.red/#/defs/platforms) list of game platforms. 

If you find shiragame useful, or have some feedback, please let me know via [GitHub issue](https://github.com/SnowflakePowered/shiragame/issues)!

For more information, see [shiraga.me](https://shiraga.me/).