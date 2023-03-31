---
tags: ['11ty']
title: Behind the scenes of create-eleventy-app
date: 2023-03-05
description: The process of making a new tool for creating Eleventy sites.
# cspell:ignore Bjankord
---

The other day, after exploring Node and CLI tools with [unvarify](https://github.com/uncenter/unvarify), I was eager to make something else. There are already some existing projects like this out there, such as [create-eleventy-site by Bjankord](https://github.com/bjankord/create-eleventy-site), but I wanted to make something that was a little less opinionated and more customizable. It needs to be clear, concise, and easy to use for people new to Eleventy but also provide advanced configuration for people familiar with Eleventy to quickly jump-start a new site.

## The process

I started by creating a new JavaScript file and importing [`inquirer.js`](https://github.com/SBoudrias/Inquirer.js). It was hard to find the proper structure for how to create a question hierarchy based on the examples and documentation, but I got it working. I then started adding questions and options. The language and phrasing of the questions is loosely based on the existing `create-____-app` tools, such as `create-react-app` and `create-next-app`. With the prompts out of the way, it was time to start working on the actual project creation.

### Generating the project

Generating the project starts with creating a new directory. This directory will be the root project directory, and it is named based on the project name that the user entered. Next, I take the answers from the `properties` prompt and make the Eleventy directories (i.e. input, output, includes, data, etc.) and the assets directories. It's pretty hard to not get opinionated, but throughout this project I tried to avoid it as much as possible by constantly referring back to the [Eleventy documentation](https://www.11ty.dev/docs/) and other starter projects.

#### Eleventy config file

Starting with the Eleventy config file, we take the filename from the prompt (`eleventy.config.js`, `eleventy.config.cjs`, and `.eleventy.js` are the options as per the documentation). There are a few parts of the config file, so I'll break it down into sections.

For the "addons" as I'm calling them (filters, shortcodes, collections), we take the answers from the prompt or by gathering the addons via the selected bundles. "Bundles" are simply pre-made sets of addons to make it easier for new users. For example, the `blog` bundle includes addons useful for blogs. For each addon, we have to separate the imports and the actual function, which are then added separately to the config file (imports at the top, functions with the rest of the configuration).

Also at the top of the file, we add the Eleventy plugins and `markdown-it` plugins. These are added based on the answers from the `plugins` prompt.

Finally, we add the `dir` section of the config file. This is where we set the input, output, includes, data, and other directories.

#### Assets and more

Next, we add the assets and dotfiles. The `index.md` homepage is based on the `create-eleventy-site` template, which is designed to look like the other `create-____-app` tools.

{% image "example.png", "Screenshot of the generated homepage" %}

For the homepage, we copy over the images, styling, layout, and `index.md` page.

Other than those essential files, I included a `site.json` in the data directory and a `.gitignore` to the root directory. Since we are copying over a bunch of files, we might as well copy over a `package.json` file as well (instead of `npm init -y`, since we want to include helpful scripts) and a `README.md` file with some basic instructions.

#### Installing dependencies

Finally, we install the dependencies. This is done by running `npm install` for each of the selected Eleventy plugins and `markdown-it` plugins, and of course `@11ty/eleventy` and `markdown-it` themselves.

## Conclusion

Overall, I'm pretty happy with how it turned out. A lot of essential features still need to be added, like proper formatting of the generated files, removing duplicate imports, etc. I would also love to further simplify the terminology and the process altogether by adding an easy mode with starter kits. I welcome any feedback or suggestions!
