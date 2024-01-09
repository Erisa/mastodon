# <img src="https://github.com/TheEssem/mastodon/raw/main/app/javascript/icons/android-chrome-256x256.png" width="128"> Chuckya

Chuckya is a close-to-upstream soft fork of Mastodon Glitch Edition (more commonly known as glitch-soc) that aims to introduce more experimental features/fixes with the goal of making the overall experience more enjoyable. Although it's mainly developed for and used on the [wetdry.world](https://wetdry.world) instance, it can be deployed by any server admin as a drop-in, backwards-compatible replacement for Mastodon.

Here are some of the changes compared to glitch-soc:

- Emoji reactions (glitch-soc/mastodon#2462)
- Tenor GIF picker (originally from [koyu.space](https://github.com/koyuspace/mastodon))
- Mastodon Modern theme (licensed under CC-BY-SA 4.0, [original repo](https://codeberg.org/Freeplay/Mastodon-Modern))
- Workaround for OpenGraph video embeds when using [Jortage](https://jortage.com)
- Multiple fixes for oEmbed/OpenGraph embeds
- Polls can be posted alongside media (glitch-soc/mastodon#2524)
- Polls can have only one option
- Restores status trend half-life to 2 hours
- Allows dashes in custom emote names
- Emojis can be put side-by-side
- Unicode emojis use [`jdecked/twemoji`](https://github.com/jdecked/twemoji) v15 graphics (mastodon/mastodon#28404)
- Minor media attachment tweaks
- Custom favicon

Setup instructions are mostly the same as [glitch-soc's](https://glitch-soc.github.io/docs); if you're migrating from an existing install, however, you'll need to run the following command before pregenerating assets to purge the existing asset cache:

```sh
RAILS_ENV=production bundle exec rails assets:clobber
```

Original glitch-soc readme is below.

# Mastodon Glitch Edition

> Now with automated deploys!

[![Build Status](https://img.shields.io/circleci/project/github/glitch-soc/mastodon.svg)][circleci]
[![Code Climate](https://img.shields.io/codeclimate/maintainability/glitch-soc/mastodon.svg)][code_climate]

[circleci]: https://circleci.com/gh/glitch-soc/mastodon
[code_climate]: https://codeclimate.com/github/glitch-soc/mastodon

So here's the deal: we all work on this code, and anyone who uses that does so absolutely at their own risk. can you dig it?

- You can view documentation for this project at [glitch-soc.github.io/docs/](https://glitch-soc.github.io/docs/).
- And contributing guidelines are available [here](CONTRIBUTING.md) and [here](https://glitch-soc.github.io/docs/contributing/).
