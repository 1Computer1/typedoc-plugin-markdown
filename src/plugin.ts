import * as path from 'path';
import { Renderer } from 'typedoc';
import { Converter } from 'typedoc/dist/lib/converter';
import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { GroupPlugin } from 'typedoc/dist/lib/converter/plugins';
import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract';

@Component({ name: 'markdown' })
export class MarkdownPlugin extends ConverterComponent {
  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_RESOLVE_BEGIN]: this.onResolveBegin,
    });
  }

  /**
   * Overide the default assets for any custom themes to inherit
   */
  onBegin() {
    Renderer.getDefaultTheme = () => path.join(__dirname, 'resources');
  }

  /**
   * Read the theme option and load the paths of any recognised built in themes
   * Otherwise pass the path through to the Renderer
   */
  onResolveBegin() {
    const options = this.application.options;
    const theme = (options.getValue('platform') as string) || (options.getValue('theme') as string);

    // if the theme is 'default' or 'markdown' load the base markdown theme
    if (theme === 'default' || theme === 'markdown') {
      options.setValue('theme', path.join(__dirname));
    }

    // load any built in sub themes
    const subThemes = ['docusaurus', 'docusaurus2', 'vuepress', 'gitbook', 'bitbucket'];
    if (subThemes.includes(theme)) {
      options.setValue('theme', path.join(__dirname, 'subthemes', theme));
    }
  }
}

GroupPlugin.sortCallback = (a: Reflection, b: Reflection): number => {
  const aWeight = GroupPlugin.WEIGHTS.indexOf(a.kind);
  const bWeight = GroupPlugin.WEIGHTS.indexOf(b.kind);
  if (aWeight === bWeight) {
      if (a.flags.isStatic && !b.flags.isStatic) {
          return 1;
      }
      if (!a.flags.isStatic && b.flags.isStatic) {
          return -1;
      }

      if (a.kindOf(ReflectionKind.Module) && b.kindOf(ReflectionKind.Module)) {
        if (a.name === b.name) {
          return 0;
        }
        return a.name > b.name ? 1 : -1;
      }

      return 0;
  } else {
      return aWeight - bWeight;
  }
}
