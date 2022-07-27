interface PluginConfig extends GeneratorConfig {
  dev?: boolean;
}

interface GeneratorConfig {
  length?: number;
  min?: number;
  max?: number;
}
