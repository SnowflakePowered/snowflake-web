---
title: "Introducing chd-rs"
date: 2022-05-19
categories:
  - programming
  - chd
  - libraries
layout: post
path: /blog/introducing-chd-rs-2022-05-19
---

CHD is quickly becoming the *de facto* format for ROM image archival. This is problematic because there is very little if any documentation on the CHD format besides its implementations. To alleviate this issue,[chd-rs](https://github.com/SnowflakePowered/chd-rs) is a from-scratch, memory safe, and [well-documented](https://docs.rs/chd/0.0.9/chd/) decoder implementation of the CHD format written in pure Rust. 

chd-rs supports all CHD versions from V1-5 and all CHD codecs for feature parity with the [MAME reference implementation](https://github.com/mamedev/mame/blob/75e986a65178e129efa88d7cc969e93203a45a91/src/lib/util/chd.cpp) and wider support than [libchdr](https://github.com/rtissera/libchdr):

• Deflate (zlib)
• Raw LZMA (lzma)
• Raw FLAC (flac)
• Huffman (huff)
• CD Deflate (cdzl)
• CD LZMA (cdlz)
• CD FLAC (cdfl)
• AV Huffman (avhu)


chd-rs also provides [C bindings](https://github.com/SnowflakePowered/chd-rs/tree/master/chd-rs-capi) that are compatible with a limited subset of libchdr. 

Out of the three prior existing implementations, only one ([Aaru](https://github.com/aaru-dps/Aaru/tree/762e3eb6d25b0a5ec81bacad2da442c11850e47d/Aaru.Images/CHD)) is not a direct derivative of the reference implementation but lacks full support for reading CHD V5. The reference implementation being an integrated part of MAME has a high barrier to usage, and because of its goals, libchdr does not support the full suite of possible codecs. libchdr and the MAME reference implementation are also optimized for speed rather than 
readability. Being written in C, libchdr tightly ties together external library concerns further hurting readibility and making it unclear how to actually decode the CHD format.

chd-rs is a clean and complete implementation written in descriptive, idiomatic Rust with documentation on the quirks of the CHD format. Library concerns such as allocation primitives and callbacks are cleanly abstracted away thanks to Rust and do not pollute the codebase. Idiosyncratic primitives like [`bitstream.h`](https://github.com/rtissera/libchdr/blob/master/include/libchdr/bitstream.h) are avoided where possible. The format implementation portions of chd-rs do not use unsafe code and is memory-safe. chd-rs has also been fuzzed to fix some validation bugs present in the reference implementation.

As chd-rs prioritizes readability and safety, chd-rs is not as performant as libchdr, but that's OK: emulators should continue to use libchdr due to its speed and ease of integration compared to chd-rs.

My hope is that chd-rs will serve as useful documentation for further alternate implementations of the CHD format in the future. Having multiple, readable implementations of a file format is important for the long term feasibility of an archival format. If you are an emulator developer for an emulator not written in a C-compatible language, my hope is that chd-rs will be a useful reference in implementing your own decoder for CHD.
