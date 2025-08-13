export type ModuleContext = {
  readonly app: Electron.App;
}

export interface AppModule {
  enable(context: ModuleContext): Promise<void>|void;
}

export type AppInitConfig = {
  preload: {
    path: string;
  };

  renderer:
    | {
        path: string;
      }
    | URL;
};