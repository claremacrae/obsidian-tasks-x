# Contribution Guidelines Obsidian Tasks

Thank you for wanting to contribute to Obsidian Tasks!
Every contribution is much appreciated!

## Updating documentation

The documentation resides under the `./docs` directory.
It consists of markdown files, which [Jekyll](https://jekyllrb.com/) will transform into web pages that you can view at <https://obsidian-tasks-group.github.io/obsidian-tasks/> .
In the simplest case, you can update the existing markdown file and create a pull request (PR) with your changes.

### Version numbers in documentation

We have introduced version markers to the documentation, to show users in which version a specific feature was introduced.
This means that newly written documentation should be tagged with a placeholder, which will be replaced with the actual
version upon release.

There are 2 styles of placeholders used through the documentation, Please pick the one that
fits your text better. (If in doubt, take a look at the existing version tags for other features.)

- `> Introduced in Tasks X.Y.Z`
  - This placeholder is usually used after a section heading.
- `> X (Y and Z) was introduced in Tasks X.Y.Z`
  - This placeholder is used when you need to tag a sub-part of something, for example a list.

### How the documentation is generated

We use [GitHub pages](https://pages.github.com/) for our documentation.
You can read more about it at their [official documentation](https://docs.github.com/en/pages).

To generate the documentation site on your machine,
see [docs/README.md](docs/README.md).

### Documentation and branches

For documentation changes to show up at <https://obsidian-tasks-group.github.io/obsidian-tasks/> , they must be in the `gh-pages` branch.
If you want to see your changes available immediately and not only after the next release, you should make your changes on the `gh-pages` branch.
When you create a PR, it should merge into the `gh-pages` branch as well.
If you document an unreleased feature, you should update the documentation on `main-tasks-sql` instead. Ideally together with the related code changes.
If this is confusing, don't worry.
We will help you make this right once you opened the PR.

## Updating code

Ideally, an [issue](https://github.com/sytone/obsidian-tasks-x/issues) already exists and we discussed your implementation in that issue before you open the pull request (PR).
This is _not_ mandatory, but it helps improve the process and reduce unnecessary back-and-forth.

Once you want to propose your changes, create a PR and we'll have a look when we have time.
Discussion will take place inside the PR.

If you can, please add/update tests and documentation where appropriate.

## Maintaining the tests

The tests use the [ts-jest](https://www.npmjs.com/package/ts-jest) wrapper around the
[jest](https://jestjs.io) test framework.

The [Expect](https://jestjs.io/docs/expect) page is a good reference for the many jest testing features.

### Snapshot Tests

For testing more complex objects, some of the tests here use Jest's
[Snapshot Testing](https://jestjs.io/docs/snapshot-testing) facility, which is similar to
[Approval Tests](https://approvaltests.com) but easier to use in JavaScript.

For readability of snapshots, we favour [Inline Snapshots](https://jestjs.io/docs/snapshot-testing#inline-snapshots),
which are saved in the source code. See that documentation for how to easily update the inline
snapshot, if the output is intended to be changed.

### Jest and the WebStorm IDE

The WebStorm IDE has a [helpful page](https://www.jetbrains.com/help/webstorm/running-unit-tests-on-jest.html)
on how it makes testing with jest easy.

Note in particular the
[Snapshot testing section](https://www.jetbrains.com/help/webstorm/running-unit-tests-on-jest.html#ws_jest_snapshot_testing)
for how to view the diffs in the event of snapshot test failures, and also how to update the saved snapshot
of one or all snapshot failures.

## Setting up build environment

This project uses Node 16.x, if you need to use a different version, look at using `nvm` to manage your Node versions. If you are using `nvm`, you can install the 16.x version of Node with `nvm install 16.19.1; nvm use 16.19.1`.

To setup the local environment after cloning the repository, run the following commands:

``` shell
yarn
yarn build
yarn test
yarn lint
```

Make sure you build, test and lint before pushing to the repository. Left hook is used to cover these checks before commit and push. To run just the markdown lint you can use `yarn run lint:markdown`.

## Local development

When developing locally, you can use the `yarn dev` command to start a development build. This will cause a rebuild of the code base every time you make a change so you can see if there are any code errors.

If you want to build and test in a local obsidian vault use `yarn run build:dev` this will generate the `main.js` in the root of the repository which has the sourcemap in it to make debugging using the development console (`Ctrl+Shift+i`) in Obsidian easier.

To make it simpler to work on the files you can use `deploy:local` which will create a symbolic link to the plugins folder for this plugin (`obsidian-tasks-plugin`). When ever a build occurs using `yarn run dev` or `yarn run build:dev` the plugin will be updated in the obsidian vault you are targeting using the `OBSIDIAN_PLUGIN_ROOT` environment variable.

It is recommended you use the [Hot-Reload](https://github.com/pjeby/hot-reload) plugin to automatically reload the plugin when files change. The script will create a `.hotreload` file in the root of the repository to assist.

## Committing Changes

Conventional Commit format is used by this repository, this is to make the commit process simpler as well as help with the autogeneration of a change log.

### Format

```text
<type>[(optional <scope>)]: <description>

[optional <body>]

[optional <footer(s)>]
```

### Types

- build: The commit alters the build system or external dependencies of the product (adding, removing, or upgrading dependencies).
- change: The commit changes the implementation of an existing feature.
- chore: The commit includes a technical or preventative maintenance task that is necessary for managing the product or the repository, but it is not tied to any specific feature or user story. For example, releasing the product can be considered a chore. Regenerating generated code that must be included in the repository could be a chore.
- ci: The commit makes changes to continuous integration or continuous delivery scripts or configuration files.
- deprecate: The commit deprecates existing functionality, but does not remove it from the product. For example, sometimes older public APIs may get deprecated because newer, more efficient APIs are available. Removing the APIs could break existing integrations so the APIs may be marked as deprecated in order to encourage the integration developers to migrate to the newer APIs while also giving them time before removing older functionality.
- docs: The commit adds, updates, or revises documentation that is stored in the repository.
- feat: The commit implements a new feature for the application.
- fix: The commit fixes a defect in the application.
- perf: The commit improves the performance of algorithms or general execution time of the product, but does not fundamentally change an existing feature.
- refactor: The commit refactors existing code in the product, but does not alter or change existing behavior in the product.
- remove: The commit removes a feature from the product. Typically features are deprecated first for a period of time before being removed. Removing a feature from the product may be considered a breaking change that will require a major version number increment.
- revert: The commit reverts one or more commits that were previously included in the product, but were accidentally merged or serious issues were discovered that required their removal from the main branch.
- security: The commit improves the security of the product or resolves a security issue that has been reported.
- style: The commit updates or reformats the style of the source code, but does not otherwise change the product implementation.
- test: The commit enhances, adds to, revised, or otherwise changes the suite of automated tests for the product.

## FAQs

### How does Tasks handle status changes?

You can toggle a task‘s status by:

1. using the command (may be bound to a hotkey),
2. clicking on a checkbox of an inline task in Reading mode,
3. clicking on a checkbox of an inline task in Live Preview, or
4. clicking on a checkbox in query results (same for Reading mode and Live Preview).

The code is located as follows:

- For 1.: `./src/Commands/ToggleDone.ts`
- Numbers 2. and 4. use a checkbox created by `Task.toLi()`. There, the checkbox gets a click event handler.
- For 3.: `./src/LivePreviewExtension.ts`

Toggle behavior:

- Number 1. toggles the line directly where the cursor is. In the file inside Obsidian‘s vault.
- The click event listener of 2. and 4. uses `File::replaceTaskWithTasks()`. That, in turn, updates the file in Obsidian‘s Vault (like 1, but it needs to find the correct line).
- Number 3. toggles the line directly where the checkbox is. On the „document“ of CodeMirror (the library that Obsidian uses to show text on screen). That, in turn, updates the file in Obsidian‘s Vault, somehow.

Obsidian writes the changes to disk at its own pace.

### How do I make a release?

Versioning is automatically handled by `standard-version` all you need to do is update the minimum obsidian version in the manifest.json file in the root of the repo. This should only be changed if you need something specific in a later version and needs to match the version in the package.json.

1. Check out the `main-tasks-sql` branch
2. Decide on a next version
    - Backwards incompatible change: Run `yarn run release:major`
    - New functionality: Run `yarn run release:minor`
    - Only bug fixes: Run `yarn run release:patch`
3. Run the yarn task to do the release.
4. The task will output the command to push the changes and the updated change log run this.
5. Wait for [GitHub Actions](https://github.com/sytone/obsidian-tasks-x/actions/workflows/release.yml) to create the new release
6. Optional: Post to
    - Obsidian Discord

        ````markdown
        🔍 {Title of release}

        x.y.z has been released, this is in sync with the current released version of tasks. Update via BRAT using `sytone/obsidian-tasks-x` as the repo.

        {Release summary}

        {Cut and past changelog.md section for version}


        🔗  Github release link:
        https://github.com/sytone/obsidian-tasks-x/releases/tag/x.y.z
        ````

    - r/ObsidianMD on Reddit
    - etc.

## Cleaning up issues with CRLF -> LF

If you are working cross platform the default EOL should be LF. If you are seeing a lot of files marked as modified but no content you can normalize your repo by running the below commands.

```pwsh
git rm --cached -r .  # Remove every file from git's index.
git reset --hard      # Rewrite git's index to pick up all the new line endings.
```
