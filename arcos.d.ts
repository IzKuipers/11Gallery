// @ts-nocheck
/// ARCOS GLOBAL TYPE DEFINITIONS
///
/// This file contains errors. I know. The important thing is that all relevant types
/// are detected and processed properly. Don't worry about it.
///
/// © IzKuipers 2025. Licensed under GPLv3.
///

declare global {
  export const __Console__: Console;

  export const ASCII_ART: string[];

  export const LINES: string[];

  export const EchoIntro: () => void;

  export function getBuild(): Promise<void>;

  export const ArcBuild: () => string;

  export function getLicense(): Promise<void>;

  export const ArcLicense: () => string;

  export function getMode(): Promise<void>;

  export const ArcMode: () => string;

  export type Subscriber<T> = (value: T) => void;

  export type Unsubscriber = () => void;

  export type Updater<T> = (value: T) => T;

  export interface Readable<T> {
      subscribe(this: void, run: Subscriber<T>, invalidate?: () => void): Unsubscriber;
  }

  export interface Writable<T> extends Readable<T> {
      set(this: void, value: T): void;
      update(this: void, updater: Updater<T>): void;
  }

  export type ReadableStore<T> = Writable<T> & {
      (): T;
      get: () => T;
  };

  export type BooleanStore = ReadableStore<boolean>;

  export type StringStore = ReadableStore<string>;

  export type NumberStore = ReadableStore<number>;

  export function Store<T>(initial?: T): ReadableStore<T>;

  export interface LogItem {
      source: string;
      message: string;
      timestamp: number;
      level: LogLevel;
      kernelTime: number;
  }

  export enum LogLevel {
      info = 0,
      warning = 1,
      error = 2,
      critical = 3
  }

  export const LogLevelCaptions: Record<LogLevel, string>;

  export const ShortLogLevelCaptions: Record<LogLevel, string>;

  export const ArcOSVersion = "7.0.3";

  export const VALIDATION_STR = "thisWonderfulArcOSServerIdentifiedByTheseWordsPleaseDontSteal(c)IzKuipers";

  export const BETA = true;

  export function Log(source: string, message: string, level?: LogLevel): void;

  export class KernelModule {
      protected readonly IS_KMOD = true;
      protected kernel: WaveKernel;
      id: string;
      constructor(kernel: WaveKernel, id: string);
      _init(): Promise<void>;
      __init(): Promise<void>;
      protected Log(message: string, level?: LogLevel): void;
  }

  export class Environment extends KernelModule {
      private store;
      private readOnlyValues;
      constructor(kernel: WaveKernel, id: string);
      _init(): Promise<void>;
      set(key: string, value: any): boolean;
      setMultiple(entries: [
          string,
          any
      ][]): void;
      delete(key: string): boolean;
      get(key: string): any;
      getMultiple(keys: string[]): any[];
      setReadonly(key: string): void;
      setWritable(key: string): void;
      reset(): void;
  }

  export type DispatchCallback = (...args: any[]) => any;

  export type SystemDispatchResult = "success" | "err_systemOnly" | "err_unknownCaller";

  export interface GlobalDispatchClient {
      socketId: string;
      userId: string;
      authorized: boolean;
      ip?: string;
  }

  export const SystemOnlyDispatches: string[];

  export const KnownSystemDispatchers: string[];

  export class SystemDispatch extends KernelModule {
      subscribers: Record<string, Record<number, (data: any) => void>>;
      constructor(kernel: WaveKernel, id: string);
      subscribe<T = any[]>(event: string, callback: (data: T) => void): number;
      unsubscribeId(event: string, id: number): void;
      discardEvent(event: string): void;
      dispatch<T = any[]>(caller: string, data?: T, system?: boolean): SystemDispatchResult;
  }

  export function arrayToText(buffer: ArrayLike<number> | ArrayBufferLike): string;

  export function textToArrayBuffer(text: string): ArrayBuffer;

  export function blobToText(blob: Blob): Promise<string>;

  export function textToBlob(text: string, type?: string): Blob;

  export function arrayToBlob(buffer: ArrayBuffer, type?: string): Blob;

  export function blobToDataURL(blob: Blob): Promise<string | undefined>;

  export const sizeUnits: string[];

  export function join(...args: string[]): string;

  export function dirname(path: string): string;

  export function getItemNameFromPath(path: string): string;

  export function getDriveLetter(path: string, allowUuid?: boolean): string | undefined;

  export function getParentDirectory(p: string): string;

  export function onFileChange(path: string, callback: () => void): void;

  export function onFolderChange(path: string, callback: () => void): void;

  export function formatBytes(bytes: number): string;

  export function DownloadFile(file: ArrayBuffer, filename: string, mimetype?: string): void;

  export class ThirdPartyAppProcess extends AppProcess {
      static readonly TPA_REV = 1;
      workingDirectory: string;
      mutationLock: boolean;
      urlCache: Record<string, string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, workingDirectory: string, ...args: any[]);
      __render__(body: HTMLDivElement): Promise<void>;
  }

  export const Sleep: (ms?: number) => Promise<unknown>;

  export function getAllJsonPaths(obj: any, prefix?: string): string[];

  export function getJsonHierarchy<T = any>(object: Object, hierarchy: string): T | null;

  export function setJsonHierarchy<T = any>(object: Object, hierarchy: string, value: T): T | null;

  export type NestedObject = Record<string, any>;

  export function applyDefaults<T = NestedObject>(target: NestedObject, defaults: NestedObject): T;

  export function validateUsername(username: string): boolean;

  export function htmlspecialchars(text: string): string;

  export function detectJavaScript(htmlString: string): string[] | null;

  export const validateEmail: (email: string) => RegExpMatchArray | null;

  export function checkPasswordStrength(password: string): Result<string>;

  export const Plural: (s: string, x: number) => string;

  export function sliceIntoChunks(arr: any[], chunkSize: number): any[][];

  export const decimalToHex: (value: number, maxLength?: number) => string;

  export function sha256(message: string): Promise<string>;

  export function CountInstances(input: string, search: string): number;

  export const maxLength: (m: string[], padding?: number) => number;

  export const Truncate: (s: string, m: number) => string;

  export const FormatLargeNumber: (n: number) => string;

  export const Gap: (n: number, s?: string) => string;

  export function tryParseInt(input: any, returnsUndefined?: boolean): any;

  export function sortByKey(array: any[], key: string, reverse?: boolean): any[];

  export function sortByHierarchy(array: any[], hierarchy: string): any[];

  export interface ArcShortcut {
      icon: string;
      name: string;
      type: "folder" | "file" | "app" | "new";
      target: string;
  }

  export type ShortcutStore = Record<string, ArcShortcut>;

  export interface FileEntry {
      name: string;
      size: number;
      dateCreated: Date;
      dateModified: Date;
      mimeType: string;
      itemId: string;
      shortcut?: ArcShortcut;
      action?: () => void;
  }

  export interface FsAccess {
      _id?: string;
      userId: string;
      shareId?: string;
      path: string;
      accessor: string;
      createdAt?: Date;
  }

  export type PathedFileEntry = FileEntry & {
      path: string;
  };

  export type FullFileEntry = FileEntry & {
      data: Blob;
  };

  export interface FolderEntry {
      name: string;
      dateCreated: Date;
      dateModified: Date;
      itemId: string;
  }

  export interface DirectoryReadReturn {
      dirs: FolderEntry[];
      files: FileEntry[];
      totalFiles: number;
      totalFolders: number;
      totalSize: number;
      shortcuts: ShortcutStore;
  }

  export interface RecursiveDirectoryReadReturn {
      dirs: RecursiveDirectory[];
      files: FileEntry[];
      shortcuts: ShortcutStore;
  }

  export type RecursiveDirectory = FolderEntry & {
      children: RecursiveDirectoryReadReturn;
  };

  export interface UserQuota extends Record<string, number | boolean | undefined> {
      used: number;
      max: number;
      free: number;
      percentage: number;
      unknown?: boolean;
  }

  export interface SingleUploadReturn {
      path: string;
      file: File;
      content: Blob;
  }

  export type UploadReturn = SingleUploadReturn[];

  export interface FilesystemProgress {
      type: "size" | "items" | "percentage";
      max: number;
      value: number;
      what?: string;
  }

  export type FilesystemProgressCallback = (progress: FilesystemProgress) => void;

  export interface FileHandler {
      isHandler: true;
      name: string;
      description: string;
      icon: string;
      hidden?: boolean;
      opens: {
          extensions?: string[];
          mimetypes?: string[];
      };
      handle: (path: string) => void;
  }

  export interface FileOpenerResult {
      type: "handler" | "app";
      app?: App;
      handler?: FileHandler;
      id: string;
  }

  export interface ServerInfo {
      validation: string;
      status: string;
      loginWallpaper: boolean;
      loginBottomText: string;
      loginNotice: string;
      disableRegistration: boolean;
  }

  export const Backend: AxiosInstance;

  export class ServerManager extends KernelModule {
      url: string;
      connected: boolean;
      serverInfo: ServerInfo | undefined;
      static isConnected(): boolean;
      static url(): string | false | undefined;
      constructor(kernel: WaveKernel, id: string);
      _init(): Promise<void>;
      private getServerUrl;
      private testConnection;
      checkUsernameAvailability(username: string): Promise<boolean>;
      checkEmailAvailability(email: string): Promise<boolean>;
  }

  export class FilesystemDrive {
      server: ServerManager;
      driveLetter: string | undefined;
      label: string;
      uuid: string;
      kernel: WaveKernel;
      readonly FIXED: boolean;
      readonly REMOVABLE: boolean;
      readonly READONLY: boolean;
      readonly HIDDEN: boolean;
      readonly IDENTIFIES_AS: string;
      readonly FILESYSTEM_SHORT: string;
      readonly FILESYSTEM_LONG: string;
      BUSY: boolean;
      protected fileLocks: Record<string, number>;
      lockFile(path: string, pid: number): Promise<void>;
      releaseLock(path: string, pid: number, fromSystem?: boolean): Promise<void>;
      constructor(kernel: WaveKernel, uuid: string, letter?: string, ...args: any[]);
      Log(message: string, level?: LogLevel): void;
      __spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      __spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      direct(path: string): Promise<string | undefined>;
      quota(): Promise<UserQuota>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
  }

  export class Filesystem extends KernelModule {
      private dispatch;
      drives: Record<string, FilesystemDrive>;
      constructor(kernel: WaveKernel, id: string);
      _init(): Promise<void>;
      getDriveById(id: string): FilesystemDrive;
      mountDrive<T = FilesystemDrive>(id: string, supplier: typeof FilesystemDrive, letter?: string, onProgress?: FilesystemProgressCallback, ...args: any[]): Promise<T | false>;
      getDriveIdByIdentifier(identifier: string): string;
      umountDrive(id: string, fromSystem?: boolean, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      getDriveByLetter(letter: string, error?: boolean): FilesystemDrive;
      getDriveIdentifier(path: string): string;
      getDriveByPath(path: string): FilesystemDrive;
      validatePath(p: string): void;
      removeDriveLetter(p: string): string;
      validateDriveLetter(letter: string): void;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
      createDirectory(path: string, dispatch?: boolean): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback, dispatch?: boolean): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string, dispatch?: boolean): Promise<boolean>;
      moveItem(source: string, destination: string, dispatch?: boolean): Promise<boolean>;
      deleteItem(path: string, dispatch?: boolean): Promise<boolean>;
      uploadFiles(target: string, accept?: string, multiple?: boolean, onProgress?: FilesystemProgressCallback): Promise<UploadReturn>;
      defaultProgress(d: FilesystemProgress): void;
      lockFile(path: string, pid: number): Promise<void>;
      releaseLock(path: string, pid: number): Promise<void>;
      direct(path: string): Promise<string | undefined>;
      nextAvailableDriveLetter(): string | undefined;
  }

  export type SoundStore = Record<string, any>;

  export type SoundBusStore = {
      [key: string]: HTMLAudioElement[];
  };

  export const ArcSounds: SoundStore;

  export class SoundBus extends KernelModule {
      private store;
      private _bus;
      private env;
      constructor(kernel: WaveKernel, id: string);
      playSound(id: string, volume?: number): boolean | undefined;
      stopSound(id: string): boolean;
      getStore(): [
          string,
          string
      ][];
      loadExternal(source: string, play?: boolean): void;
  }

  export class ProcessDispatch {
      private store;
      private parent;
      private kernel;
      constructor(process: Process);
      subscribe(event: string, callback: DispatchCallback): void;
      dispatch(event: string, ...args: any[]): Promise<boolean>;
  }

  export class Process {
      env: Environment;
      soundBus: SoundBus;
      handler: ProcessHandler;
      dispatch: ProcessDispatch;
      systemDispatch: SystemDispatch;
      kernel: WaveKernel;
      pid: number;
      parentPid: number;
      name: string;
      _disposed: boolean;
      _criticalProcess: boolean;
      fs: Filesystem;
      private fileLocks;
      constructor(handler: ProcessHandler, pid: number, parentPid?: number, ...args: any[]);
      protected stop(): Promise<any>;
      protected start(): Promise<any>;
      __start(): Promise<any>;
      __stop(): Promise<any>;
      killSelf(): Promise<void>;
      protected Log(message: string, level?: LogLevel): void;
      requestFileLock(path: string): Promise<false | undefined>;
      unlockFile(path: string): Promise<false | undefined>;
  }

  export type MaybePromise<T> = T | Promise<T>;

  export interface App {
      metadata: AppMetadata;
      size: Size;
      minSize: Size;
      maxSize: Size;
      position: MaybeCenteredPosition;
      state: AppState;
      controls: WindowControls;
      assets: AppAssets;
      autoRun?: boolean;
      core?: boolean;
      hidden?: boolean;
      overlay?: boolean;
      glass?: boolean;
      thirdParty?: false;
      id: string;
      originId?: string;
      entrypoint?: string;
      workingDirectory?: string;
      opens?: {
          extensions?: string[];
          mimeTypes?: string[];
      };
      elevated?: boolean;
      acceleratorDescriptions?: Record<string, string>;
      fileSignatures?: Record<string, string>;
      process?: ThirdPartyAppProcess;
      tpaRevision?: number;
      noSafeMode?: boolean;
      vital?: boolean;
  }

  export type RegisteredProcess = {
      metadata: AppMetadata;
      id: string;
      assets: {
          runtime: typeof Process;
      };
      vital?: boolean;
  };

  export interface InstalledApp extends App {
      metadata: AppMetadata;
      tpaPath: string;
  }

  export type ScriptedApp = Omit<App, "assets">;

  export interface AppMetadata {
      name: string;
      version: string;
      author: string;
      icon: string;
      appGroup?: string;
  }

  export interface AppState {
      resizable: boolean;
      minimized: boolean;
      maximized: boolean;
      fullscreen: boolean;
      headless: boolean;
  }

  export interface WindowControls {
      minimize: boolean;
      maximize: boolean;
      close: boolean;
  }

  export interface AppAssets {
      runtime: typeof Process;
      component?: typeof SvelteComponent;
  }

  export interface AppComponentProps<T = AppProcess> {
      process: T;
      pid: number;
      kernel: WaveKernel;
      handler: ProcessHandler;
      app: App;
      windowTitle: ReadableStore<string>;
      windowIcon: ReadableStore<string>;
  }

  export type Size = {
      w: number;
      h: number;
  };

  export type Position = {
      x: number;
      y: number;
  };

  export type MaybeCenteredPosition = Partial<Position> & {
      centered?: boolean;
  };

  export type AppProcessData = {
      data: App;
      id: string;
      desktop?: string;
  };

  export type AppStorage = ((App | InstalledApp) & {
      originId?: string;
  })[];

  export type AppStoreCb = () => MaybePromise<AppStorage>;

  export interface ContextMenuItem {
      sep?: boolean;
      caption?: string;
      icon?: string;
      image?: string;
      isActive?: ContextMenuCallback<boolean>;
      action?: ContextMenuCallback;
      subItems?: ContextMenuItem[];
      disabled?: ContextMenuCallback<boolean>;
      accelerator?: string;
  }

  export type ContextMenuCallback<T = any> = (...args: any[]) => MaybePromise<T>;

  export type AppContextMenu = {
      [key: string]: ContextMenuItem[];
  };

  export interface ContextMenuInstance {
      x: number;
      y: number;
      items: ContextMenuItem[];
      process?: AppProcess;
      artificial?: boolean;
      props?: any[];
  }

  export interface WindowResizer {
      className: string;
      cursor: string;
      width: string;
      height: string;
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
  }

  export interface MessageBoxData {
      title: string;
      message?: string;
      content?: Component<any>;
      buttons: MessageBoxButton[];
      image?: string;
      sound?: string;
  }

  export interface MessageBoxButton {
      caption: string;
      action: () => void;
      suggested?: boolean;
  }

  export type ConfirmationData = Omit<MessageBoxData, "buttons">;

  export class MessageBoxRuntime extends AppProcess {
      data: MessageBoxData | undefined;
      acted: ReadableStore<boolean>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, data: MessageBoxData);
      start(): Promise<void>;
      render(): Promise<void>;
      onClose(): Promise<boolean>;
  }

  export const MessageBoxApp: App;

  export function MessageBox(data: MessageBoxData, parentPid: number, overlay?: boolean): Promise<void>;

  export function GetConfirmation(data: ConfirmationData, parentPid: number, overlay?: boolean): Promise<boolean>;

  export interface SearchItem {
      caption: string;
      action: (item?: SearchItem) => void;
      image?: string;
      description?: string;
  }

  export type SearchProvider = () => Promise<SearchItem[]> | SearchItem[];

  export interface UserTheme {
      author: string;
      version: string;
      name: string;
      taskbarLabels: boolean;
      taskbarDocked: boolean;
      taskbarColored: boolean;
      noAnimations: boolean;
      sharpCorners: boolean;
      compactContext: boolean;
      noGlass: boolean;
      desktopWallpaper: string;
      desktopTheme: string;
      desktopAccent: string;
      loginBackground?: string;
  }

  export type UserThemeNoMeta = Omit<Omit<Omit<UserTheme, "author">, "version">, "name">;

  export type ThemeStore = {
      [key: string]: UserTheme;
  };

  export const UserThemeKeys: string[];

  export interface Wallpaper {
      author: string;
      name: string;
      source?: string;
      url: string;
      thumb: string;
      builtin?: boolean;
  }

  export interface UserInfo {
      username: string;
      preferences: UserPreferences;
      admin: boolean;
      adminScopes: string[];
      approved: boolean;
      _id: string;
      email: string;
      updatedAt: string;
      createdAt: string;
      hasTotp: boolean;
      restricted: boolean;
      accountNumber: number;
      storageSize: number;
  }

  export type UserPreferencesStore = ReadableStore<UserPreferences>;

  export interface UserPreferences {
      shell: ShellPreferences;
      security: SecurityPreferences;
      appPreferences: ApplicationPreferences;
      account: AccountSettings;
      isDefault?: boolean;
      desktop: DesktopPreferences;
      userThemes: ThemeStore;
      userWallpapers: Record<string, Wallpaper>;
      userApps: Record<string, App>;
      currentThemeId?: string;
      searchOptions: ArcFindOptions;
      pinnedApps: string[];
      disabledApps: string[];
      workspaces: WorkspacesOptions;
      globalSettings: Record<string, any>;
      startup?: Record<string, "app" | "file" | "folder" | "share" | "disabled">;
  }

  export type ExpandedUserInfo = UserInfo & {
      profile: PublicUserInfo;
  };

  export interface WorkspacesOptions {
      desktops: Workspace[];
      index: number;
  }

  export interface Workspace {
      name?: string;
      uuid: string;
  }

  export interface ArcFindOptions {
      includeFilesystem: boolean;
      includeSettingsPages: boolean;
      includeApps: boolean;
      includePower: boolean;
      cacheFilesystem: boolean;
      showHiddenApps: boolean;
      showThirdPartyApps: boolean;
  }

  export interface CustomStylePreferences {
      enabled: boolean;
      content?: string;
  }

  export interface ShellPreferences {
      taskbar: TaskbarPreferences;
      start: StartMenuPreferences;
      visuals: VisualPreferences;
      customStyle: CustomStylePreferences;
      actionCenter: {
          weatherLocation: {
              latitude: number;
              longitude: number;
              name?: string;
          };
          noteContent: string;
          galleryImage: string;
          cardIndex: number;
          hideQuickSettings: boolean;
      };
  }

  export interface TaskbarPreferences {
      labels: boolean;
      docked: boolean;
      colored: boolean;
      clockSecs: boolean;
      clockDate: boolean;
      clock12hr: boolean;
      batteryPercentage: boolean;
  }

  export interface DesktopPreferences {
      wallpaper: string;
      icons: boolean;
      theme: "light" | "dark" | string;
      sharp: boolean;
      accent: string;
      noIconGrid: boolean;
      lockIcons: boolean;
  }

  export interface StartMenuPreferences {
      noGroups: boolean;
  }

  export interface VisualPreferences {
      noAnimations: boolean;
      sharpCorners: boolean;
      compactContext: boolean;
      showHiddenApps: boolean;
      noGlass: boolean;
      userFont?: string;
  }

  export interface SecurityPreferences {
      lockdown: boolean;
      noPassword: boolean;
      disabled: boolean;
      enableThirdParty: boolean;
  }

  export interface AccountSettings {
      profilePicture: string | number | null;
      loginBackground: string;
      displayName?: string;
  }

  export interface ApplicationPreferences {
      experiments: {
          [key: string]: boolean;
      };
      [key: string]: ScopedAppData;
  }

  export type ScopedAppData = {
      [key: string]: any;
  };

  export type WallpaperGetters = [
      string,
      (id: string) => Wallpaper | Promise<Wallpaper>
  ][];

  export type PasswordStrength = "tooWeak" | "weak" | "medium" | "strong";

  export const PasswordStrengthCaptions: Record<PasswordStrength, string>;

  export interface PublicUserInfo {
      username: string;
      displayName?: string;
      profilePicture: string;
      accountNumber: number;
      admin: boolean;
      dispatchClients: number;
  }

  export interface TypedProcess {
      start?: () => any;
      stop?: () => any;
      killSelf: () => Promise<boolean>;
      pid: number;
      parentPid?: number;
      name: string;
      _disposed: boolean;
      _criticalProcess: boolean;
  }

  export type RenderArgs = Record<string, any>;

  export type ProcessSpawnResult = "success" | "err_disabled" | "err_aboveLimit";

  export type ProcessKillResult = "success" | "err_elevation" | "err_criticalProcess" | "err_disposed" | "err_noExist" | "err_killCancel";

  export interface FsProgressOperation {
      type: "quantity" | "size" | "none";
      icon: string;
      caption: string;
      subtitle: string;
      done: number;
      max: number;
      cancel?: () => void;
      waiting: boolean;
      working: boolean;
      errors: string[];
  }

  export interface FileProgressMutator {
      progress: ReadableStore<FsProgressOperation>;
      mutateMax: (mutator: number) => void;
      mutDone: (mutator: number) => void;
      mutErr: (mutator: string) => void;
      setMax: (value: number) => void;
      setDone: (value: number) => void;
      setErrors: (value: string[]) => void;
      setCancel: (cancel: (() => void) | undefined) => void;
      updateCaption: (caption: string) => void;
      updSub: (subtitle: string) => void;
      setWait: (waiting: boolean) => void;
      setWork: (waiting: boolean) => void;
      stop: () => Promise<any>;
      show: () => Promise<any>;
      setType: (type: "quantity" | "size" | "none") => void;
  }

  export const DummyFileProgress: FileProgressMutator;

  export class FsProgressRuntime extends AppProcess {
      Progress: ReadableStore<FsProgressOperation>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, store: ReadableStore<FsProgressOperation>);
      render({ store }: RenderArgs): Promise<void> | undefined;
      onClose(): Promise<boolean>;
  }

  export class GlobalLoadIndicatorRuntime extends AppProcess {
      caption: ReadableStore<string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, caption: string);
  }

  export interface IconPickerData {
      forWhat: string;
      defaultIcon: string;
      returnId: string;
  }

  export interface Tab {
      location: string;
      title: string;
      icon: string;
  }

  export interface Location {
      name: string;
      icon: string;
      component: any;
  }

  export type QuotedDrive = {
      data: FilesystemDrive;
      quota: UserQuota;
  };

  export interface LoadSaveDialogData {
      title: string;
      icon: string;
      startDir?: string;
      isSave?: boolean;
      targetPid?: number;
      extensions?: string[];
      returnId: string;
      saveName?: string;
      multiple?: boolean;
      folder?: boolean;
  }

  export interface FileManagerNotice {
      icon: string;
      text: string;
      className?: string;
  }

  export interface VirtualFileManagerLocation {
      name: string;
      icon: string;
      component: Component;
      hidden?: boolean;
  }

  export function tryJsonParse<T = any>(input: any): T;

  export function tryJsonStringify(input: any, indent: number): string;

  export function keysToLowerCase(obj: any): any;

  export type ValidationObject = {
      [key: string]: any;
  };

  export function validateObject(target: ValidationObject, validation: ValidationObject): boolean;

  export class BaseService extends Process {
      host: ServiceHost;
      activated: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      _activate(...args: any[]): Promise<void>;
      afterActivate(): Promise<void>;
      activate(...args: any[]): Promise<void>;
  }

  export interface BugReport {
      authorId?: string;
      title: string;
      body: string;
      logs: LogItem[];
      closed: boolean;
      resolved: boolean;
      version: `${number}.${number}.${number}`;
      location: Location;
      userData?: Record<string, any>;
      userAgent?: string;
      api?: string;
      frontend: string;
      meta: MetaEnvironment;
      _id?: string;
      createdAt: string;
      mode: string;
      build: string;
      public: boolean;
  }

  export interface OutgoingBugReport {
      title: string;
      body: string;
      logs: LogItem[];
      version: `${number}.${number}.${number}`;
      location: Location;
      userAgent?: string;
      api?: string;
      frontend: string;
      meta: MetaEnvironment;
      mode: string;
      build: string;
      public?: boolean;
  }

  export interface Location {
      hash: string;
      host: string;
      hostname: string;
      href: string;
      origin: string;
      pathname: string;
      port: string;
      protocol: string;
      search: string;
  }

  export interface MetaEnvironment {
      BASE_URL: string;
      MODE: string;
      DEV: boolean;
      PROD: boolean;
      SSR: boolean;
      DW_SERVER_URL?: string;
      DW_SERVER_AUTHCODE?: string;
  }

  export interface ReportStatistics extends Record<string, number> {
      opened: number;
      closed: number;
      resolved: number;
      total: number;
      apis: number;
  }

  export interface ReportOptions {
      title: string;
      body?: string;
      noLogs?: boolean;
      anonymous?: boolean;
      public?: boolean;
  }

  export interface Service {
      name: string;
      description: string;
      process: typeof BaseService;
      startCondition?: (daemon: UserDaemon) => MaybePromise<boolean>;
      pid?: number;
      id?: string;
      initialState?: InitialServiceState;
      loadedAt?: number;
      changedAt?: number;
  }

  export type ServiceStore = Map<string, Service>;

  export type ReadableServiceStore = ReadableStore<ServiceStore>;

  export type InitialServiceState = "stopped" | "started";

  export type ServiceChangeResult = "err_noExist" | "err_alreadyRunning" | "err_notRunning" | "err_startCondition" | "err_spawnFailed" | "err_noManager" | "err_elevation" | "err_managerPaused" | "success";

  export class BugHuntUserSpaceProcess extends BaseService {
      INVALIDATION_THRESHOLD: number;
      privateCache: BugReport[];
      publicCache: BugReport[];
      cachedPrivateResponseCount: number;
      cachedPublicResponseCount: number;
      token: string | undefined;
      module: BugHunt;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      activate(token: string): Promise<void>;
      afterActivate(): Promise<void>;
      sendBugReport(options: ReportOptions): Promise<boolean>;
      getPrivateReports(forceInvalidate?: boolean): Promise<BugReport[]>;
      getPublicReports(forceInvalidate?: boolean): Promise<BugReport[]>;
      refreshPrivateCache(): Promise<false | undefined>;
      refreshPublicCache(): Promise<false | undefined>;
      refreshAllCaches(): Promise<false | undefined>;
  }

  export const bhuspService: Service;

  export interface ArcPackage {
      name: string;
      author: string;
      version: string;
      description: string;
      installLocation: `U:/Applications/${string}`;
      appId: string;
  }

  export interface ProjectMetadata {
      metadata: ArcPackage;
      devPort?: number;
      repository?: string;
      outFile: string;
      payloadDir: string;
      buildHash?: string;
      noHotRelaunch?: boolean;
  }

  export type DevEnvActivationResult = "success" | "ping_failed" | "port_mismatch" | "build_mismatch" | "already_connected" | "websock_failed" | "drivemnt_failed";

  export const DevEnvActivationResultCaptions: Record<DevEnvActivationResult, string>;

  export function toForm(object: Record<string, any>): FormData;

  export class DevDrive extends FilesystemDrive {
      FIXED: boolean;
      REMOVABLE: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      private axios;
      private url;
      label: string;
      constructor(kernel: WaveKernel, uuid: string, letter: string, axios: AxiosInstance, url: string);
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
  }

  export class DevelopmentEnvironment extends BaseService {
      connected: boolean;
      private port?;
      private url?;
      private client;
      private axios?;
      meta?: ProjectMetadata;
      private daemon;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      connect(port: number): Promise<DevEnvActivationResult>;
      disconnect(): Promise<undefined>;
      getProjectMeta(): Promise<ProjectMetadata | undefined>;
      mountDevDrive(): Promise<boolean | undefined>;
      restartTpa(): Promise<undefined>;
      killTpa(): Promise<undefined>;
      stop(): Promise<void>;
  }

  export const devEnvironmentService: Service;

  export interface SharedDriveType {
      userId: string;
      accessors: string[];
      shareName: string;
      maxSize: number;
      passwordHash: string;
      description?: string;
      locked: boolean;
      ownerName?: string;
      _id: string;
  }

  export interface ShareCreateOptions {
      userId: string;
      description?: string;
      size?: number;
      shareName: string;
      password: string;
  }

  export class SharedDrive extends FilesystemDrive {
      shareId: string | undefined;
      token: string;
      shareInfo: SharedDriveType;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      constructor(kernel: WaveKernel, uuid: string, letter: string, info: SharedDriveType, token: string);
      _spinUp(): Promise<boolean>;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, blob: Blob, onProgress: FilesystemProgressCallback): Promise<boolean>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
  }

  export class ShareManager extends BaseService {
      token: string | undefined;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      activate(token: string): Promise<void>;
      getOwnedShares(): Promise<SharedDriveType[]>;
      mountOwnedShares(): Promise<void>;
      getJoinedShares(): Promise<SharedDriveType[]>;
      createShare(name: string, password: string): Promise<SharedDriveType | undefined>;
      deleteShare(shareId: string): Promise<boolean>;
      changeSharePassword(shareId: string, newPassword: string): Promise<boolean>;
      renameShare(shareId: string, newName: string): Promise<boolean>;
      joinShare(username: string, shareName: string, password: string, mountAlso?: boolean): Promise<boolean | FilesystemDrive>;
      leaveShare(shareId: string): Promise<boolean>;
      unmountIfMounted(shareId: string): Promise<void>;
      kickUserFromShare(shareId: string, userId: string): Promise<boolean>;
      mountShare(username: string, shareName: string, letter?: string, onProgress?: FilesystemProgressCallback): Promise<false | FilesystemDrive>;
      mountShareById(shareId: string, letter?: string, onProgress?: FilesystemProgressCallback): Promise<false | FilesystemDrive>;
      getShareMembers(shareId: string): Promise<Record<string, string>>;
      getShareInfoByName(username: string, shareName: string): Promise<SharedDriveType | undefined>;
      getShareInfoById(shareId: string): Promise<SharedDriveType | undefined>;
  }

  export const shareService: Service;

  export class AdminServerDrive extends FilesystemDrive {
      private targetUsername;
      private token;
      READONLY: boolean;
      FIXED: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      constructor(kernel: WaveKernel, uuid: string, letter: string, token: string, targetUsername: string);
      _spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      createDirectory(path: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string, onProgress: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
  }

  export interface Activity {
      authorId: string;
      token: string;
      userAgent: string;
      location: Location;
      action: "unknown" | "login" | "logout";
      createdAt?: Date;
      _id: string;
  }

  export type ExpandedActivity = Activity & {
      user?: ExpandedUserInfo;
  };

  export interface Approval {
      username: string;
      userId: string;
      emailAddress: string;
      validationId: string;
      timestamp: number;
      validated: boolean;
  }

  export interface AuditLog {
      _id: string;
      authorId: string;
      message: string;
      severity: AuditSeverity;
      targetUserId?: string;
      data: Record<any, any>;
      createdAt: string;
  }

  export enum AuditSeverity {
      normal = 0,
      medium = 1,
      high = 2,
      critical = 3,
      deadly = 4
  }

  export enum AuditSeverityIcons {
      moon = 0,
      "shield-checkc" = 1,
      "shield-ellipsis" = 2,
      "shield-x" = 3,
      siren = 4
  }

  export interface FsAccess {
      _id?: string;
      userId: string;
      path: string;
      accessor: string;
      createdAt?: Date;
  }

  export interface FSItem {
      _id: string;
      userId: string;
      itemId: string;
      type: "file" | "directory";
      size?: number;
      mimeType?: string;
      dateCreated: Date;
      dateModified: Date;
      path: string;
  }

  export interface Token {
      value: string;
      userId: string;
      _id?: string;
      lastUsed?: number;
      timesUsed?: number;
      userAgent?: string;
  }

  export type ExpandedToken = Token & {
      user?: ExpandedUserInfo;
  };

  export interface User {
      username: string;
      passwordHash: string;
      preferences: object;
      admin: boolean;
      adminScopes: string[];
      approved: boolean;
      _id: string;
      email: string;
      storageSize?: number;
  }

  export interface ServerLogItem {
      message: string;
      origin: string;
      timestamp: number;
      subs: string[];
  }

  export enum ServerLogLevel {
      info = 0,
      warning = 1,
      error = 2,
      critical = 3
  }

  export interface ServerStatistics {
      counts: ServerStatGroup;
      sizes: ServerStatGroup;
      endpoints: number;
  }

  export interface ServerStatGroup extends Record<string, number> {
      tokens: number;
      users: number;
      indexes: number;
      accessors: number;
      approvals: number;
      bugreps: number;
      audits: number;
      activities: number;
  }

  export interface UserTotp extends Record<string, string | boolean> {
      userId: string;
      secret: string;
      activated: boolean;
      url: string;
  }

  export interface PartialUserTotp {
      _id: string;
      activated: boolean;
      userId: string;
  }

  export interface SharedDrive {
      userId: string;
      accessors: string[];
      shareName: string;
      maxSize: number;
      passwordHash: string;
      description?: string;
      locked: boolean;
      _id?: string;
  }

  export interface ShareCreateOptions {
      userId: string;
      description?: string;
      size?: number;
      shareName: string;
      password: string;
  }

  export interface UserStatistics {
      activities: number;
      approvals: number;
      bughunts: number;
      fsaccesses: number;
      indexings: number;
      messages: number;
      shares: number;
      tokens: number;
  }

  export const AdminScopes: {
      adminGod: string;
      adminAuditLog: string;
      adminLogs: string;
      adminGrant: string;
      adminRevoke: string;
      adminPreferencesGet: string;
      adminUserfsFolder: string;
      adminUserfsFile: string;
      adminUserfsDirect: string;
      adminUserfsTree: string;
      adminUserfsQuota: string;
      adminPreferencesPut: string;
      adminUsersList: string;
      adminUsersDelete: string;
      adminUsersChangePswd: string;
      adminUsersChangeEmail: string;
      adminUsersApprove: string;
      adminUsersDisapprove: string;
      adminStats: string;
      adminTokensGet: string;
      adminTokensPurgeAllDelete: string;
      adminTokensPurgeUserDelete: string;
      adminTokensPurgeOneDelete: string;
      adminScopesPut: string;
      adminScopesGet: string;
      adminScopesAvailable: string;
      adminBugHuntList: string;
      adminBugHuntClose: string;
      adminBugHuntOpen: string;
      adminBugHuntGet: string;
      adminBugHuntDelete: string;
      adminBugHuntStats: string;
      adminActivitiesList: string;
      adminActivitiesUserGet: string;
      adminActivitiesDelete: string;
      adminActivitiesDeleteUser: string;
      adminTotpGet: string;
      adminTotpGetUser: string;
      adminTotpDeactivateUser: string;
      adminTotpDeleteUser: string;
      adminAccessorsGet: string;
      adminAccessorsGetUser: string;
      adminAccessorsDelete: string;
      adminAccessorsDeleteUser: string;
      adminIndexGet: string;
      adminIndexGetUser: string;
      adminIndexUser: string;
      adminIndexDeleteUser: string;
      adminShareInteract: string;
      adminShareList: string;
      adminShareListUser: string;
      adminShareDelete: string;
      adminShareMembersGet: string;
      adminShareKick: string;
      adminShareAddUser: string;
      adminShareAccessorsGet: string;
      adminShareAccessorsDelete: string;
      adminShareChangePswd: string;
      adminShareRename: string;
      adminShareChown: string;
      adminShareQuotaGet: string;
      adminShareQuotaPut: string;
  };

  export const AdminScopeCaptions: Record<string, string>;

  export class AdminBootstrapper extends BaseService {
      private token;
      private availableScopes;
      private userInfo;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      activate(token: string): Promise<void>;
      afterActivate(): Promise<void>;
      getUserInfo(): Promise<UserInfo | undefined>;
      mountUserDrive(username: string, driveLetter?: string, onProgress?: FilesystemProgressCallback): Promise<false | FilesystemDrive>;
      mountAllUsers(): Promise<void>;
      getAllUsers(): Promise<ExpandedUserInfo[]>;
      getUserByUsername(username: string): Promise<UserInfo | undefined>;
      getServerLogs(): Promise<ServerLogItem[]>;
      getAuditLog(): Promise<AuditLog[]>;
      grantAdmin(username: string): Promise<boolean>;
      revokeAdmin(username: string): Promise<boolean>;
      getPreferencesOf(username: string): Promise<UserPreferences | undefined>;
      setPreferencesOf(username: string, preferences: UserPreferences): Promise<boolean>;
      deleteUser(username: string): Promise<boolean>;
      getStatistics(): Promise<ServerStatistics | undefined>;
      getAllTokens(): Promise<Token[]>;
      purgeAllTokens(): Promise<boolean>;
      purgeOneToken(id: string): Promise<boolean>;
      purgeUserTokens(userId: string): Promise<boolean>;
      deleteBugReport(reportId: string): Promise<boolean>;
      closeBugReport(reportId: string): Promise<boolean>;
      reopenBugReport(reportId: string): Promise<boolean>;
      getAllBugReports(): Promise<BugReport[]>;
      getBugReport(id: string): Promise<BugReport | undefined>;
      getBugHuntStatistics(): Promise<ReportStatistics | undefined>;
      approveUser(username: string): Promise<boolean>;
      disapproveUser(username: string): Promise<boolean>;
      changeEmailOf(username: string, newEmail: string): Promise<boolean>;
      changePasswordOf(username: string, newPassword: string): Promise<boolean>;
      getAvailableScopes(): Promise<Record<string, string>>;
      getScopesOf(username: string): Promise<string[]>;
      setScopesOf(username: string, scopes: string[]): Promise<boolean>;
      getQuotaOf(username: string): Promise<UserQuota | undefined>;
      setQuotaOf(username: string, newQuota: number): Promise<boolean>;
      getAllActivity(): Promise<Activity[]>;
      getActivityOf(username: string): Promise<Activity[]>;
      deleteAllActivities(): Promise<boolean>;
      deleteActivitiesOf(username: string): Promise<boolean>;
      getAllTotp(): Promise<PartialUserTotp[]>;
      getTotpOf(username: string): Promise<UserTotp | undefined>;
      deActivateTotpOf(username: string): Promise<boolean>;
      deleteTotpOf(username: string): Promise<boolean>;
      getAllFsAccessors(): Promise<FsAccess[]>;
      getFsAccessorsOf(username: string): Promise<FsAccess[]>;
      deleteAllFsAccessors(): Promise<boolean>;
      deleteFsAccessorsOf(username: string): Promise<boolean>;
      getAllIndexingNodes(): Promise<FSItem[]>;
      getIndexingNodesOf(username: string): Promise<FSItem[]>;
      forceIndexFor(username: string): Promise<string[]>;
      deleteIndexingOf(username: string): Promise<boolean>;
      canAccess(...scopes: string[]): boolean;
      canAccessP(provided: UserInfo, ...scopes: string[]): boolean;
      getMissingScopes(...scopes: string[]): string[];
      getAllShares(): Promise<SharedDriveType[]>;
      getSharesOf(userId: string): Promise<SharedDriveType[]>;
      deleteShare(shareId: string): Promise<boolean>;
      kickUserFromShare(shareId: string, userId: string): Promise<boolean>;
      addUserToShare(shareId: string, userId: string): Promise<boolean>;
      getShareAccessors(shareId: string): Promise<FSItem[]>;
      deleteShareAccessors(shareId: string): Promise<boolean>;
      changeSharePassword(shareId: string, newPassword: string): Promise<boolean>;
      renameShare(shareId: string, newName: string): Promise<boolean>;
      changeShareOwner(shareId: string, newUserId: string): Promise<boolean>;
      getStatisticsOf(userId: string): Promise<UserStatistics | undefined>;
      setShareQuotaOf(shareId: string, quota: number): Promise<boolean>;
      getShareQuotaOf(shareId: string): Promise<UserQuota | undefined>;
      unlockShare(shareId: string): Promise<boolean>;
      lockShare(shareId: string): Promise<boolean>;
  }

  export const adminService: Service;

  export interface Message {
      authorId: string;
      title: string;
      body: string;
      recipient: string;
      attachments?: string[];
      _id: string;
      repliesTo?: string;
      deleted?: boolean;
      correlationId: string;
      createdAt: string;
      updatedAt: string;
      author?: PublicUserInfo;
  }

  export interface MessageCreateData {
      title: string;
      body: string;
      recipients: string[];
      attachments: File[];
  }

  export interface MessageNode extends Message {
      replies: MessageNode[];
  }

  export interface PartialMessage {
      authorId: string;
      title: string;
      recipient: string;
      attachmentCount: number;
      deleted?: boolean;
      _id: string;
      repliesTo?: string;
      createdAt: string;
      author?: PublicUserInfo;
      correlationId: string;
  }

  export type ExpandedMessage = Omit<Message, "attachments"> & {
      attachments: MessageAttachment[];
  };

  export type ExpandedPartialMessage = Omit<PartialMessage, "attachments"> & {
      attachments: MessageAttachment[];
  };

  export interface MessageAttachment {
      filename: string;
      size: number;
      mimeType: string;
      signature: string;
      _id: string;
  }

  export class GlobalDispatch extends BaseService {
      client: Socket | undefined;
      token?: string;
      authorized: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      activate(token: string): Promise<void>;
      connected(token: string): Promise<void>;
      subscribe<T extends Array<any> = any[]>(event: string, callback: (...data: T) => void): void;
      emit(event: string, ...data: any[]): void;
      stop(): Promise<void>;
      getClients(): Promise<GlobalDispatchClient[]>;
      disconnectClient(clientId: string): Promise<boolean>;
  }

  export const globalDispatchService: Service;

  export class MessagingInterface extends BaseService {
      token: string | undefined;
      serverUrl: string | false | undefined;
      serverAuthCode: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      activate(token: string): Promise<void>;
      getSentMessages(): Promise<PartialMessage[]>;
      getReceivedMessages(): Promise<PartialMessage[]>;
      sendMessage(subject: string, recipients: string[], body: string, attachments: File[], repliesTo?: string, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      deleteMessage(messageId: string): Promise<boolean>;
      readMessage(messageId: string): Promise<ExpandedMessage | undefined>;
      readAttachment(messageId: string, attachmentId: string, onProgress?: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      getMessageThread(messageId?: string): Promise<MessageNode[]>;
      buildAttachment(filePath: string, onProgress?: FilesystemProgressCallback): Promise<File | undefined>;
  }

  export const messagingService: Service;

  export class ServiceHost extends Process {
      Services: ReadableServiceStore;
      _holdRestart: boolean;
      private _storeLoaded;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      readonly STORE: Map<string, {
          name: string;
          description: string;
          process: typeof BaseService;
          startCondition?: (daemon: UserDaemon) => MaybePromise<boolean>;
          pid?: number;
          id?: string;
          initialState?: InitialServiceState;
          loadedAt?: number;
          changedAt?: number;
      }>;
      loadStore(store: ServiceStore): boolean;
      getServiceInfo(id: string): Service | undefined;
      startService(id: string): Promise<"success" | "err_noExist" | "err_alreadyRunning" | "err_startCondition" | "err_spawnFailed">;
      stopService(id: string): Promise<ServiceChangeResult>;
      restartService(id: string): Promise<ServiceChangeResult>;
      initialRun(): Promise<void>;
      init(): Promise<void>;
      verifyServicesProcesses(): Promise<void>;
      getService<T extends BaseService = BaseService>(id: string): T | undefined;
      stop(): Promise<void>;
  }

  export class ApplicationStorage extends BaseService {
      private origins;
      private injectedStore;
      buffer: ReadableStore<AppStorage>;
      appIconCache: Record<string, string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, name: string, host: ServiceHost);
      start(): Promise<void>;
      loadOrigin(id: string, store: AppStoreCb): boolean;
      unloadOrigin(id: string): boolean;
      loadApp(app: App): false | App;
      injected(): {
          metadata: AppMetadata;
          size: Size;
          minSize: Size;
          maxSize: Size;
          position: MaybeCenteredPosition;
          state: AppState;
          controls: WindowControls;
          assets: AppAssets;
          autoRun?: boolean;
          core?: boolean;
          hidden?: boolean;
          overlay?: boolean;
          glass?: boolean;
          thirdParty?: false;
          id: string;
          originId?: string;
          entrypoint?: string;
          workingDirectory?: string;
          opens?: {
              extensions?: string[];
              mimeTypes?: string[];
          };
          elevated?: boolean;
          acceleratorDescriptions?: Record<string, string>;
          fileSignatures?: Record<string, string>;
          process?: ThirdPartyAppProcess;
          tpaRevision?: number;
          noSafeMode?: boolean;
          vital?: boolean;
      }[];
      refresh(): Promise<void>;
      get(): Promise<any[]>;
      getAppById(id: string, fromBuffer?: boolean): Promise<App | undefined>;
  }

  export const appStoreService: Service;

  export interface AdminPortalPage {
      name: string;
      icon: string;
      content: Component<any>;
      hidden?: boolean;
      separator?: boolean;
      scopes?: string[];
      parent?: string;
      props?: (process: AdminPortalRuntime) => Promise<Record<string, any>> | Record<string, any>;
  }

  export type AdminPortalPages = Map<string, AdminPortalPage>;

  export type PageData = Record<string, any>;

  export type DashboardData = {
      stats: ServerStatistics;
      logs: ServerLogItem[];
  };

  export type BugHuntData = {
      users: User[];
      reports: BugReport[];
      stats: ReportStatistics;
  };

  export type ViewBugReportData = {
      report: BugReport;
  };

  export type UsersData = {
      users: ExpandedUserInfo[];
  };

  export type ViewUserData = {
      user: ExpandedUserInfo;
      reports: BugReport[];
  };

  export type SharesData = {
      shares: SharedDriveType[];
      users: ExpandedUserInfo[];
  };

  export type ViewShareData = {
      share: SharedDriveType;
      accessors: FsAccess[];
      users: ExpandedUserInfo[];
  };

  export type FilesystemsData = {
      users: ExpandedUserInfo[];
  };

  export type TokensData = {
      tokens: ExpandedToken[];
      users: ExpandedUserInfo[];
  };

  export type ActivitiesData = {
      activities: Activity[];
      users: ExpandedUserInfo[];
  };

  export type ScopesData = {
      admins: ExpandedUserInfo[];
  };

  export type ViewScopesData = {
      admin: ExpandedUserInfo;
      scopes: Record<string, string>;
  };

  export type AuditLogData = {
      users: ExpandedUserInfo[];
      audits: AuditLog[];
  };

  export type UsersPageFilters = "all" | "regular" | "admins" | "disapproved" | "online";

  export type SharesPageFilters = "all" | "resized" | "locked";

  export interface SpecificAdminAction {
      caption: string;
      scopes: string[];
      className?: string;
      disabled?: (user: UserInfo) => boolean;
      separate?: boolean;
  }

  export type SpecificAdminActions = Record<string, SpecificAdminAction>;

  export const AdminPortalPageStore: AdminPortalPages;

  export const LogoTranslations: Record<string, string>;

  export const specificAdminActions: SpecificAdminActions;

  export class BugHuntUserDataRuntime extends AppProcess {
      data: UserInfo;
      hljs: HLJSApi;
      html: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, data: UserInfo);
  }

  export const BugHuntUserDataApp: App;

  export class AdminPortalRuntime extends AppProcess {
      ready: ReadableStore<boolean>;
      currentPage: ReadableStore<string>;
      switchPageProps: ReadableStore<Record<string, any>>;
      redacted: ReadableStore<boolean>;
      shares: ShareManager;
      admin: AdminBootstrapper;
      protected overlayStore: Record<string, App>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, page?: string);
      switchPage(pageId: string, props?: Record<string, any>, force?: boolean): Promise<void>;
  }

  export const AdminPortalApp: App;

  export class AcceleratorOverviewRuntime extends AppProcess {
      KnownAcceleratorKeys: string[];
      store: ReadableStore<[
          string,
          [
              string[],
              string
          ][]
      ][]>;
      apps: ReadableStore<AppStorage>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      splitAcceleratorString(accelerator: string): string[];
  }

  export const AcceleratorOverviewApp: App;

  export interface ElevationData {
      what: string;
      image: string;
      title: string;
      description: string;
      level: ElevationLevel;
  }

  export enum ElevationLevel {
      low = 0,
      medium = 1,
      high = 2
  }

  export class AppInfoRuntime extends AppProcess {
      targetApp: ReadableStore<App>;
      targetAppId: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, appId: string);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      killAll(): Promise<void>;
      processManager(): Promise<void>;
  }

  export const AppInfoApp: App;

  export function UUID(): string;

  export type InstallStatusType = "mkdir" | "file" | "registration" | "other";

  export type InstallStatusMode = "done" | "failed" | "working";

  export interface InstallStatusItem {
      type: InstallStatusType;
      status: InstallStatusMode;
      content: string;
  }

  export type InstallStatus = Record<string, InstallStatusItem>;

  export class AppInstallerRuntime extends AppProcess {
      status: ReadableStore<InstallStatus>;
      failReason: ReadableStore<string>;
      installing: ReadableStore<boolean>;
      completed: ReadableStore<boolean>;
      focused: ReadableStore<string>;
      verboseLog: string[];
      metadata?: ArcPackage;
      zip?: JSZip;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, metadata: ReadableStore<ArcPackage>, zip: JSZip);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      logStatus(content: string, type?: InstallStatusType, status?: InstallStatusMode): void;
      setCurrentStatus(status: InstallStatusMode): Promise<void>;
      setCurrentContent(content: string): Promise<void>;
      fail(reason: string): void;
      viewLog(): Promise<void>;
      go(): Promise<void>;
      getFiles(): Promise<{
          files: {
              [k: string]: JSZip.JSZipObject;
          };
          sortedPaths: string[];
      }>;
      createInstallLocation(): Promise<boolean>;
      registerApp(): Promise<boolean>;
      mkdir(path: string): Promise<boolean>;
      writeFile(path: string, content: ArrayBuffer): Promise<boolean>;
      onClose(): Promise<boolean>;
      revert(): Promise<void>;
      runNow(): void;
  }

  export const AppInstallerApp: App;

  export class AppPreInstallRuntime extends AppProcess {
      pkgPath: string;
      zip: JSZip | undefined;
      metadata: ReadableStore<ArcPackage>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, pkgPath: string);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      fail(reason: string): void;
      install(): Promise<void>;
  }

  export const AppPreinstallApp: App;

  export const ArcFind: App;

  export function WindowSystemContextMenu(runtime: ContextMenuRuntime): AppContextMenu;

  export class ContextMenuRuntime extends AppProcess {
      contextData: ReadableStore<ContextMenuInstance | null>;
      CLICKLOCKED: boolean;
      contextProps: Record<string, any[]>;
      private readonly validContexMenuTags;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      createContextMenu(data: ContextMenuInstance): Promise<void>;
      closeContextMenu(): void;
      assignContextMenuHooks(): void;
      handleContext(e: MouseEvent): Promise<void>;
      getWindowByEventTarget(target: EventTarget[]): HTMLDivElement | null;
      composePosition(x: number, y: number, mW: number, mH: number): [
          number,
          number
      ];
      getContextEntry(pid: number, scope: string): ContextMenuItem[];
      getContextMenuScope(e: MouseEvent): HTMLDivElement | null;
      onClose(): Promise<boolean>;
  }

  export const ContextMenuApp: App;

  export interface ExitAction {
      caption: string;
      action: (daemon: UserDaemon) => void;
      alternateAction?: (daemon: UserDaemon) => void;
      icon: string;
  }

  export const ExitActions: Record<string, ExitAction>;

  export class ExitRuntime extends AppProcess {
      selected: ReadableStore<string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, selected?: string);
      go(action: ExitAction | undefined, alternate?: boolean): void;
  }

  export const ExitApp: App;

  export class NewFileRuntime extends AppProcess {
      newFile: ReadableStore<string>;
      path: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path: string);
      render(): void;
      createFile(): Promise<void>;
  }

  export const FsNewFileApp: App;

  export class NewFolderRuntime extends AppProcess {
      newFolder: ReadableStore<string>;
      path: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path: string);
      render(): Promise<void> | undefined;
      createFolder(): Promise<void>;
  }

  export const FsNewFolderApp: App;

  export const FsProgressApp: App;

  export class RenameItemRuntime extends AppProcess {
      newName: ReadableStore<string>;
      parentDir: string;
      path: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path: string);
      render(): void;
      rename(): Promise<void>;
  }

  export const FsRenameItemApp: App;

  export const GlobalLoadIndicatorApp: App;

  export function getAllImages(): Record<string, string>;

  export function getGroupedIcons(): Record<string, Record<string, string>>;

  export function getIconPath(id: string): string;

  export function iconIdFromPath(path: string): string;

  export function maybeIconId(id: string): string;

  export class IconPickerRuntime extends AppProcess {
      forWhat?: string;
      defaultIcon?: string;
      selected: ReadableStore<string>;
      groups: Record<string, Record<string, string>>;
      store: Record<string, string>;
      returnId?: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, data: IconPickerData);
      start(): Promise<false | undefined>;
      confirm(): Promise<void>;
      cancel(): Promise<void>;
  }

  export const IconPickerApp: App;

  export interface ItemInfo {
      meta: {
          sort: "file" | "folder";
          mimetype?: string;
          size?: number;
          created: string;
          modified: string;
      };
      location: {
          fullPath: string;
          extension?: string;
          parent?: string;
          drive?: string;
          driveFs?: string;
      };
      isFolder: boolean;
      isShortcut: boolean;
      name: string;
  }

  export class ItemInfoRuntime extends AppProcess {
      info: ReadableStore<ItemInfo>;
      shortcut: ReadableStore<ArcShortcut>;
      drive: FilesystemDrive | undefined;
      isDrive: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path: string, file: FileEntry | FolderEntry);
      start(): Promise<false | undefined>;
      render({ path, file }: RenderArgs): Promise<void>;
      open(): Promise<void>;
      openWith(path: string): Promise<void>;
      renameItem(): Promise<void>;
      unmount(): void;
      confirmUmountDrive(drive: FilesystemDrive, id: string): Promise<void>;
  }

  export const ItemInfoApp: App;

  export interface Attachment {
      data: File;
      uuid: string;
  }

  export class MessageComposerRuntime extends AppProcess {
      sending: ReadableStore<boolean>;
      recipients: ReadableStore<string[]>;
      attachments: ReadableStore<Attachment[]>;
      title: ReadableStore<string>;
      body: ReadableStore<string>;
      replyId: string | undefined;
      service: MessagingInterface;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, initialData?: MessageCreateData, replyId?: string);
      send(): Promise<void>;
      sendFailed(): void;
      addAttachment(): Promise<void>;
      removeRecipient(recipient: string): void;
      filesToAttachments(...files: File[]): Attachment[];
      removeAttachment(uuid: string): void;
      isModified(): number;
      discard(): Promise<void>;
  }

  export const MessageComposerApp: App;

  export class OpenWithRuntime extends AppProcess {
      available: ReadableStore<FileOpenerResult[]>;
      all: ReadableStore<FileOpenerResult[]>;
      apps: ReadableStore<FileOpenerResult[]>;
      filename: ReadableStore<string>;
      path: ReadableStore<string>;
      selectedId: ReadableStore<string>;
      viewMode: ReadableStore<"all" | "apps" | "compatible">;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path: string);
      start(): Promise<false | undefined>;
      render({ path }: RenderArgs): Promise<void>;
      go(id?: string): Promise<void>;
  }

  export const OpenWithApp: App;

  export function LoginUser(identity: string, password: string): Promise<any>;

  export function RegisterUser(username: string, email: string, password: string): Promise<boolean>;

  export class SecureContextRuntime extends AppProcess {
      private id;
      private key;
      data: ElevationData;
      password: ReadableStore<string>;
      loading: ReadableStore<boolean>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, id: string, key: string, data: ElevationData);
      start(): Promise<false | undefined>;
      render(): Promise<void>;
      validate(): Promise<boolean | undefined>;
      approve(): Promise<void>;
      deny(): Promise<void>;
      passwordIncorrect(): Promise<void>;
      settings(): Promise<void>;
  }

  export const SecureContextApp: App;

  export interface AppKeyCombination {
      alt?: boolean;
      ctrl?: boolean;
      shift?: boolean;
      key?: string;
      action(proc: any, event: KeyboardEvent): void;
      global?: boolean;
  }

  export type AppKeyCombinations = AppKeyCombination[];

  export function FileManagerAccelerators(runtime: FileManagerRuntime): AppKeyCombinations;

  export function EditMenu(runtime: FileManagerRuntime): ContextMenuItem;

  export function FileMenu(runtime: FileManagerRuntime): ContextMenuItem;

  export function GoMenu(runtime: FileManagerRuntime): ContextMenuItem;

  export function FileManagerAltMenu(runtime: FileManagerRuntime): ContextMenuItem[];

  export function FileManagerContextMenu(runtime: FileManagerRuntime): AppContextMenu;

  export class FileManagerRuntime extends AppProcess {
      path: ReadableStore<string>;
      contents: ReadableStore<DirectoryReadReturn | undefined>;
      shortcuts: ReadableStore<ShortcutStore>;
      loading: ReadableStore<boolean>;
      errored: ReadableStore<boolean>;
      selection: ReadableStore<string[]>;
      copyList: ReadableStore<string[]>;
      cutList: ReadableStore<string[]>;
      starting: ReadableStore<boolean>;
      rootFolders: ReadableStore<FolderEntry[]>;
      drives: ReadableStore<Record<string, QuotedDrive>>;
      notice: ReadableStore<FileManagerNotice | undefined>;
      showNotice: ReadableStore<boolean>;
      loadSave: LoadSaveDialogData | undefined;
      saveName: ReadableStore<string>;
      virtual: ReadableStore<VirtualFileManagerLocation | undefined>;
      directoryListing: ReadableStore<HTMLDivElement>;
      virtualLocations: Record<string, VirtualFileManagerLocation>;
      private _refreshLocked;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path?: string, loadSave?: LoadSaveDialogData);
      contextMenu: AppContextMenu;
      updateAltMenu(): void;
      render({ path }: RenderArgs): Promise<void>;
      updateDrives(): Promise<void>;
      updateRootFolders(): Promise<void>;
      navigate(path: string): Promise<void>;
      refresh(): Promise<void>;
      DirectoryNotFound(): void;
      parentDir(): void;
      updateSelection(e: MouseEvent, path: string): void;
      setCopyFiles(files?: string[]): void;
      setCutFiles(files?: string[]): void;
      pasteFiles(): Promise<void>;
      unmountDrive(drive: FilesystemDrive, id: string): void;
      confirmUmountDrive(drive: FilesystemDrive, id: string): Promise<void>;
      uploadItems(): Promise<void>;
      lockRefresh(): void;
      unlockRefresh(refresh?: boolean): void;
      openFile(path: string): Promise<void>;
      deleteSelected(): Promise<void>;
      confirmDeleteSelected(): Promise<void>;
      downloadSelected(): Promise<false | undefined>;
      singlefySelected(): void;
      selectorUp(): Promise<void>;
      selectorDown(): Promise<void>;
      EnterKey(alternative?: boolean): Promise<void>;
      isDirectory(path: string, workingPath?: string): boolean | undefined;
      confirmLoadSave(): Promise<void>;
      createShortcut(name: string, path: string, folder?: boolean): Promise<void>;
      checkNotice(): Promise<void>;
      shareAccessIsAdministrative(drive: FilesystemDrive): boolean;
  }

  export class ShareConnGuiRuntime extends AppProcess {
      shareUsername: ReadableStore<string>;
      shareName: ReadableStore<string>;
      sharePassword: ReadableStore<string>;
      shares: ShareManager;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      go(): Promise<void>;
      myShares(): Promise<void>;
  }

  export const ShareConnGuiApp: App;

  export class ShareCreateGuiRuntime extends AppProcess {
      shareName: ReadableStore<string>;
      sharePassword: ReadableStore<string>;
      shares: ShareManager;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      go(): Promise<void>;
      myShares(): Promise<void>;
  }

  export const ShareCreateGuiApp: App;

  export class ShareListGuiRuntime extends AppProcess {
      ownedShares: ReadableStore<SharedDriveType[]>;
      joinedShares: ReadableStore<SharedDriveType[]>;
      selectedShare: ReadableStore<string>;
      selectedIsOwn: ReadableStore<boolean>;
      selectedIsMounted: ReadableStore<boolean>;
      loading: ReadableStore<boolean>;
      shares: ShareManager;
      thisUserId: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      manageShare(): Promise<void>;
      leaveShare(): Promise<void>;
      mountShare(): Promise<void>;
      openShare(): Promise<void>;
      createShare(): Promise<void>;
  }

  export const ShareListGuiApp: App;

  export class OverlayRuntime extends AppProcess {
      parentProcess: ShareMgmtGuiRuntime;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
  }

  export const ChangePasswordApp: App;

  export const RenameShareApp: App;

  export class ShareMgmtGuiRuntime extends AppProcess {
      members: ReadableStore<Record<string, string>>;
      info: SharedDriveType | undefined;
      shares: ShareManager;
      shareId: string;
      selectedMember: ReadableStore<string>;
      myShare: boolean;
      protected overlayStore: Record<string, App>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, shareId: string);
      start(): Promise<any>;
      updateMembers(): Promise<void>;
      kickUser(id: string, username: string): Promise<void>;
      deleteShare(): Promise<void>;
  }

  export const ShareMgmtGuiApp: App;

  export const ArcShellApp: App;

  export interface WeatherMeta {
      caption: string;
      iconColor: string;
      icon: string;
      gradient: {
          start: string;
          end: string;
      };
  }

  export type WeatherInformation = {
      temperature: number;
      condition: string;
      code: number;
      className: string;
      gradient: {
          start: string;
          end: string;
      } | undefined;
      icon: string;
      iconColor: string;
      isNight: boolean;
  } | false;

  export interface ShellTrayIcon {
      pid: number;
      identifier: string;
      popup?: TrayPopup;
      icon: string;
      context?: ContextMenuItem[];
      action?: (targetedProcess: Process) => void;
  }

  export interface TrayIconOptions {
      popup?: TrayPopup;
      icon: string;
      context?: ContextMenuItem[];
      action?: (targetedProcess: Process) => void;
  }

  export interface TrayPopup {
      component?: Component;
      width: number;
      height: number;
      className?: string;
  }

  export interface QuickSetting {
      isActive: (process: ShellRuntime) => boolean | Promise<boolean>;
      action: (process: ShellRuntime) => any;
      icon: string;
      className?: string;
      caption: string;
  }

  export type TrayIconDiscriminator = `${number}#${string}`;

  export class TrayIconProcess extends Process {
      targetPid: number;
      identifier: string;
      popup?: TrayPopup;
      context?: ContextMenuItem[];
      action?: (targetedProcess: Process) => void;
      componentMount: Record<string, any>;
      icon: string;
      shell: ShellRuntime;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, data: ShellTrayIcon);
      __render(): Promise<void>;
      stop(): Promise<void>;
      renderPopup(popup: HTMLDivElement, target: Process): Promise<void>;
      getPopupBody(): Element | null;
  }

  export class TrayHostRuntime extends Process {
      userDaemon: UserDaemon | undefined;
      userPreferences?: UserPreferencesStore;
      trayIcons: ReadableStore<Record<`${number}#${string}`, TrayIconProcess>>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, _: AppProcessData);
      start(): Promise<false | undefined>;
      createTrayIcon(pid: number, identifier: string, options: TrayIconOptions, process?: typeof TrayIconProcess): Promise<boolean>;
      disposeTrayIcon(pid: number, identifier: string): Promise<false | undefined>;
      disposeProcessTrayIcons(pid: number): void;
  }

  export class ShellHostRuntime extends Process {
      private autoloadApps;
      readonly shellComponents: string[];
      userDaemon: UserDaemon | undefined;
      userPreferences: UserPreferencesStore;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, _: AppProcessData, autoloadApps: string[]);
      start(): Promise<false | undefined>;
  }

  export const ShellHostApp: App;

  export class ShortcutPropertiesRuntime extends AppProcess {
      shortcutData: ReadableStore<ArcShortcut>;
      iconStore: Record<string, string>;
      path?: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path: string, data: ArcShortcut);
      start(): Promise<false | undefined>;
      save(): Promise<void>;
      goTarget(): Promise<void>;
      changeIcon(): Promise<void>;
      pickTarget(): Promise<void>;
  }

  export const ShortcutPropertiesApp: App;

  export class SystemShortcutsRuntime extends AppProcess {
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<false | undefined>;
      closeFocused(): Promise<void>;
  }

  export const SystemShortcuts: App;

  export class TerminalWindowRuntime extends AppProcess {
      term: Terminal | undefined;
      overridePopulatable: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      protected stop(): Promise<void>;
  }

  export const TerminalWindowApp: App;

  export class TotpAuthGuiRuntime extends AppProcess {
      private token;
      private dispatchId;
      digits: ReadableStore<(number | undefined)[]>;
      inputs: ReadableStore<HTMLInputElement[]>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, token: string, dispatchId: string);
      render(args: RenderArgs): false | undefined;
      validate(): boolean;
      verifyTotp(): Promise<boolean>;
      doDispatch(): Promise<void>;
      cancel(): Promise<void>;
      cantAccess(): void;
  }

  export const TotpAuthGuiApp: App;

  export class TotpSetupGuiRuntime extends AppProcess {
      digits: ReadableStore<(number | undefined)[]>;
      inputs: ReadableStore<HTMLInputElement[]>;
      url: ReadableStore<string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      validate(): boolean;
      activateTotp(): Promise<boolean>;
  }

  export const TotpSetupGuiApp: App;

  export const TrayHost: App;

  export class OverlayRuntime extends AppProcess {
      parentProcess: SettingsRuntime;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
  }

  export const ChangePasswordApp: App;

  export const ChangeUsernameApp: App;

  export const SaveThemeApp: App;

  export const UrlLoginBackground: App;

  export const UrlProfilePicture: App;

  export const UrlWallpaper: App;

  export const UserFontApp: App;

  export interface SettingsPage {
      name: string;
      icon: string;
      content: Component<any>;
      hidden?: boolean;
      separator?: boolean;
      description: string;
      noSafeMode?: boolean;
  }

  export type SettingsPages = Map<string, SettingsPage>;

  export type SettingsSlides = Map<string, Component<any>>;

  export const settingsPageStore: SettingsPages;

  export const SlideStore: SettingsSlides;

  export class SettingsRuntime extends AppProcess {
      currentPage: ReadableStore<string>;
      currentSlide: ReadableStore<string>;
      slideVisible: ReadableStore<boolean>;
      requestedSlide: string | undefined;
      protected overlayStore: Record<string, App>;
      protected elevations: Record<string, ElevationData>;
      contextMenu: AppContextMenu;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, page?: string, slide?: string);
      render(): Promise<void>;
      switchPage(pageId: string): void;
      showSlide(id: string): Promise<void>;
      loginActivity(): Promise<void>;
      logOutEverywhere(): Promise<void>;
      uploadWallpaper(): Promise<void>;
      viewLicense(): Promise<void>;
      deleteThemeConfirmation(id?: string): void;
      chooseProfilePicture(): Promise<void>;
      chooseWallpaper(): Promise<void>;
      chooseLoginBackground(): Promise<void>;
      setup2fa(): Promise<void>;
      disableTotp(): Promise<void>;
  }

  export function WallpaperContextMenu(runtime: WallpaperRuntime): AppContextMenu;

  export class WallpaperRuntime extends AppProcess {
      contents: ReadableStore<DirectoryReadReturn | undefined>;
      selected: ReadableStore<string>;
      shortcuts: ReadableStore<ShortcutStore>;
      iconsElement: ReadableStore<HTMLDivElement>;
      orphaned: ReadableStore<string[]>;
      directory: string;
      contextMenu: AppContextMenu;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, desktopDir?: string);
      render({ desktopDir }: {
          desktopDir: string;
      }): Promise<void>;
      updateContents(): Promise<void>;
      findAndDeleteOrphans(contents: DirectoryReadReturn | undefined): void;
      findFreeDesktopIconPosition(identifier: string, wrapper?: HTMLDivElement): Promise<unknown> | {
          x: number;
          y: number;
      };
      deleteItem(path: string): Promise<void>;
      uploadItems(): Promise<void>;
  }

  export const WallpaperApp: App;

  export class AdvSysSetRuntime extends AppProcess {
      currentTab: ReadableStore<string>;
      tabs: Record<string, Component>;
      preferencesBuffer: ReadableStore<UserPreferences>;
      syncInitialized: boolean;
      bufferInitialized: boolean;
      bufferChanged: ReadableStore<boolean>;
      displayingDesync: boolean;
      preferencesSub?: Unsubscriber;
      bufferSub?: Unsubscriber;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      apply(close?: boolean): void;
  }

  export const AdvSystemSettings: App;

  export interface TerminalCommand {
      keyword: string;
      description: string;
      hidden?: boolean;
      exec: (term: ArcTerminal, flags: Arguments, argv: string[]) => number | Promise<number>;
  }

  export type Arguments = Record<string, string | boolean>;

  export interface Variable {
      get: () => string | undefined;
      set?: (v: string) => Promise<any> | any;
      value?: string;
      readOnly: boolean;
      canDelete: boolean;
  }

  export type VariableStore = {
      [key: string]: Variable;
  };

  export interface StaticVariable {
      value: string | undefined;
      readOnly: boolean;
  }

  export type StaticVariableStore = {
      [key: string]: StaticVariable;
  };

  export type Sections = {
      [key: string]: string[];
  };

  export interface ArcTermConfiguration {
      prompt?: string;
      greeting?: string;
      noLogo?: boolean;
      gooseBumps?: boolean;
  }

  export class TerminalProcess extends Process {
      static keyword: string;
      static description: string;
      static hidden: boolean;
      private exitCode;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
      _main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<any>;
  }

  export interface Highlighter {
      highlight(line: string, pos: number): string;
      highlightPrompt(prompt: string): string;
      highlightChar(line: string, pos: number): boolean;
  }

  export class IdentityHighlighter implements Highlighter {
      highlight(line: string, pos: number): string;
      highlightPrompt(prompt: string): string;
      highlightChar(line: string, pos: number): boolean;
  }

  export class History extends Process {
      entries: string[];
      maxEntries: number;
      cursor: number;
      private terminal;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, maxEntries: number, terminal?: ArcTerminal);
      start(): Promise<false | undefined>;
      save(): void;
      restore(): undefined;
      append(text: string): undefined;
      resetCursor(): void;
      next(): string | undefined;
      prev(): string | undefined;
  }

  export enum InputType {
      Text = 0,
      AltEnter = 1,
      ArrowUp = 2,
      ArrowDown = 3,
      ArrowLeft = 4,
      ArrowRight = 5,
      Delete = 6,
      Backspace = 7,
      CtrlA = 8,
      CtrlC = 9,
      CtrlD = 10,
      CtrlE = 11,
      CtrlK = 12,
      CtrlL = 13,
      CtrlQ = 14,
      CtrlS = 15,
      CtrlU = 16,
      End = 17,
      Enter = 18,
      Home = 19,
      ShiftEnter = 20,
      UnsupportedControlChar = 21,
      UnsupportedEscape = 22
  }

  export interface Input {
      inputType: InputType;
      data: string[];
  }

  export function parseInput(data: string): Input[];

  export type RepeatCount = number;

  export class LineBuffer {
      buf: string;
      pos: number;
      buffer(): string;
      pos_buffer(): string;
      length(): number;
      char_length(): number;
      update(text: string, pos: number): void;
      insert(text: string): boolean;
      moveBack(n: number): boolean;
      moveForward(n: number): boolean;
      moveHome(): boolean;
      moveEnd(): boolean;
      startOfLine(): number;
      endOfLine(): number;
      moveLineUp(n: number): boolean;
      moveLineDown(n: number): boolean;
      set_pos(pos: number): void;
      prevPos(n: RepeatCount): number | undefined;
      nextPos(n: RepeatCount): number | undefined;
      backspace(n: RepeatCount): boolean;
      delete(n: RepeatCount): boolean;
      deleteEndOfLine(): boolean;
  }

  export interface Output {
      write(text: string): void;
      print(text: string): void;
      println(text: string): void;
  }

  export class Tty {
      tabWidth: number;
      col: number;
      row: number;
      private out;
      constructor(col: number, row: number, tabWidth: number, out: Output);
      write(text: string): void;
      print(text: string): void;
      println(text: string): void;
      clearScreen(): void;
      calculatePosition(text: string, orig: Position): Position;
      computeLayout(promptSize: Position, line: LineBuffer): Layout;
      refreshLine(prompt: string, line: LineBuffer, oldLayout: Layout, newLayout: Layout, highlighter: Highlighter, conceiled?: boolean): void;
      clearOldRows(layout: Layout): void;
      moveCursor(oldCursor: Position, newCursor: Position): void;
  }

  export class Position {
      col: number;
      row: number;
      constructor(rows?: number, cols?: number);
  }

  export class Layout {
      promptSize: Position;
      cursor: Position;
      end: Position;
      constructor(promptSize: Position);
  }

  export class State extends Process {
      private prompt;
      private promptSize;
      private line;
      private tty;
      private layout;
      private highlighter;
      private highlighting;
      private history;
      private conceiled;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, prompt: string, tty: Tty, highlighter: Highlighter, history?: History, conceiled?: boolean);
      buffer(): string;
      shouldHighlight(): boolean;
      clearScreen(): void;
      editInsert(text: string): void;
      update(text: string): void;
      editBackspace(n: number): void;
      editDelete(n: number): void;
      editDeleteEndOfLine(): void;
      refresh(): void;
      moveCursorBack(n: number): void;
      moveCursorForward(n: number): void;
      moveCursorUp(n: number): void;
      moveCursorDown(n: number): void;
      moveCursorHome(): void;
      moveCursorEnd(): void;
      moveCursorToEnd(): void;
      previousHistory(): void;
      nextHistory(): void;
      moveCursor(): void;
  }

  export type CheckHandler = (text: string) => boolean;

  export type CtrlCHandler = () => void;

  export type PauseHandler = (resume: boolean) => void;

  export class Readline extends Process implements ITerminalAddon {
      private term;
      private highlighter;
      private history;
      private activeRead;
      private disposables;
      private watermark;
      private highWatermark;
      private lowWatermark;
      private highWater;
      private state;
      private checkHandler;
      private ctrlCHandler;
      terminal: ArcTerminal | undefined;
      private pauseHandler;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, terminal?: ArcTerminal);
      start(): Promise<void>;
      activate(term: Terminal): void;
      dispose(): void;
      appendHistory(text: string): void;
      setHighlighter(highlighter: Highlighter): void;
      setCheckHandler(fn: CheckHandler): void;
      setCtrlCHandler(fn: CtrlCHandler): void;
      setPauseHandler(fn: PauseHandler): void;
      writeReady(): boolean;
      write(text: string): void;
      print(text: string): void;
      println(text: string): void;
      output(): Output;
      tty(): Tty;
      read(prompt: string, conceiled?: boolean): Promise<string>;
      private handleKeyEvent;
      private readData;
      private readPaste;
      private readKey;
  }

  export const AdminAccessorsDeleteAll: AdminCommandType;

  export const AdminAccessorsDeleteUser: AdminCommandType;

  export const AdminAccessorsListAll: AdminCommandType;

  export const AdminAccessorsListUser: AdminCommandType;

  export const AdminActivitiesDeleteAll: AdminCommandType;

  export const AdminActivitiesDeleteUser: AdminCommandType;

  export const AdminActivitiesListAll: AdminCommandType;

  export const AdminActivitiesListUser: AdminCommandType;

  export const AdminGrant: AdminCommandType;

  export const AdminRevoke: AdminCommandType;

  export function arrayToAsciiTable(arr: string[][] | number[][]): string;

  export const AdminBugHuntReportGet: AdminCommandType;

  export const AdminBugHuntListAll: AdminCommandType;

  export const AdminBugHuntReportClose: AdminCommandType;

  export const AdminBugHuntReportDelete: AdminCommandType;

  export const AdminBugHuntReportOpen: AdminCommandType;

  export const AdminBugHuntStats: AdminCommandType;

  export const AdminHelp: AdminCommandType;

  export const AdminIndexingDelete: AdminCommandType;

  export const AdminIndexingForce: AdminCommandType;

  export const AdminIndexingListAll: AdminCommandType;

  export const AdminIndexingListUser: AdminCommandType;

  export const AdminMount: AdminCommandType;

  export const AdminScopesAdd: AdminCommandType;

  export const AdminScopesAvailable: AdminCommandType;

  export const AdminScopesGet: AdminCommandType;

  export const AdminScopesRemove: AdminCommandType;

  export const AdminServerAuditlog: AdminCommandType;

  export const AdminServerLogs: AdminCommandType;

  export const AdminServerPing: AdminCommandType;

  export const AdminServerStats: AdminCommandType;

  export const AdminShareAccessorsDelete: AdminCommandType;

  export const AdminShareAccessorsList: AdminCommandType;

  export const AdminShareAdduser: AdminCommandType;

  export const AdminShareChangepswdGenerated: AdminCommandType;

  export const AdminShareChangepswdManual: AdminCommandType;

  export const AdminShareChown: AdminCommandType;

  export const AdminShareDelete: AdminCommandType;

  export const AdminShareKick: AdminCommandType;

  export const AdminShareListAll: AdminCommandType;

  export const AdminShareListUser: AdminCommandType;

  export const AdminShareRename: AdminCommandType;

  export const AdminTokensListAll: AdminCommandType;

  export const AdminTokensPurgeAll: AdminCommandType;

  export const AdminTokensPurgeOne: AdminCommandType;

  export const AdminTokensPurgeUser: AdminCommandType;

  export const AdminTotpDeactivate: AdminCommandType;

  export const AdminTotpDelete: AdminCommandType;

  export const AdminTotpGet: AdminCommandType;

  export const AdminTotpListAll: AdminCommandType;

  export const AdminUserApprove: AdminCommandType;

  export const AdminUserChangeemail: AdminCommandType;

  export const AdminUserChangepswdGenerated: AdminCommandType;

  export const AdminUserChangepswdManual: AdminCommandType;

  export const AdminUserDelete: AdminCommandType;

  export const AdminUserDisapprove: AdminCommandType;

  export const AdminUserList: AdminCommandType;

  export const AdminUserPreferencesDelete: AdminCommandType;

  export const AdminUserPreferencesGet: AdminCommandType;

  export const AdminUserPreferencesSet: AdminCommandType;

  export const AdminUserQuotaGet: AdminCommandType;

  export const AdminUserQuotaSet: AdminCommandType;

  export const AdminCommandStore: {
      server: {
          logs: AdminCommandType;
          auditlog: AdminCommandType;
          stats: AdminCommandType;
          ping: AdminCommandType;
      };
      admin: {
          grant: AdminCommandType;
          revoke: AdminCommandType;
          scopes: {
              available: AdminCommandType;
              get: AdminCommandType;
              add: AdminCommandType;
              remove: AdminCommandType;
          };
      };
      tokens: {
          list: {
              all: AdminCommandType;
          };
          purge: {
              all: AdminCommandType;
              one: AdminCommandType;
              user: AdminCommandType;
          };
      };
      bughunt: {
          report: {
              delete: AdminCommandType;
              open: AdminCommandType;
              close: AdminCommandType;
              get: AdminCommandType;
          };
          list: {
              all: AdminCommandType;
          };
          stats: AdminCommandType;
      };
      user: {
          approve: AdminCommandType;
          disapprove: AdminCommandType;
          changeemail: AdminCommandType;
          list: AdminCommandType;
          changepswd: {
              generated: AdminCommandType;
              manual: AdminCommandType;
          };
          preferences: {
              get: AdminCommandType;
              set: AdminCommandType;
              delete: AdminCommandType;
          };
          delete: AdminCommandType;
          quota: {
              get: AdminCommandType;
              set: AdminCommandType;
          };
      };
      mount: AdminCommandType;
      activities: {
          list: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
          delete: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
      };
      totp: {
          list: {
              all: AdminCommandType;
          };
          get: AdminCommandType;
          delete: AdminCommandType;
          deactivate: AdminCommandType;
      };
      "?": AdminCommandType;
      accessors: {
          list: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
          delete: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
      };
      indexing: {
          list: {
              user: AdminCommandType;
              all: AdminCommandType;
          };
          force: AdminCommandType;
          delete: AdminCommandType;
      };
      share: {
          list: {
              all: AdminCommandType;
              user: AdminCommandType;
          };
          delete: AdminCommandType;
          kick: AdminCommandType;
          adduser: AdminCommandType;
          accessors: {
              list: AdminCommandType;
              delete: AdminCommandType;
          };
          changepswd: {
              manual: AdminCommandType;
              generated: AdminCommandType;
          };
          rename: AdminCommandType;
          chown: AdminCommandType;
      };
  };

  export const RESULT_CAPTIONS: Record<number, string>;

  export class AdminCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      static hidden: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export type AdminCommandType = (term: ArcTerminal, admin: AdminBootstrapper, argv: string[]) => Promise<number>;

  export class AppListCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      main(term: ArcTerminal, flags: Arguments): Promise<0 | 1>;
  }

  export const CAPTIONS: {
      gpu: string;
      cpu: string;
      mem: string;
      net: string;
  };

  export interface DeviceInfo {
      gpu: GPU;
      cpu: CPU;
      mem: Memory;
      net: Network;
  }

  export interface GPU {
      supported: boolean;
      active: boolean;
      vendor: string | undefined;
      model: string | undefined;
  }

  export interface CPU {
      cores: number;
  }

  export interface Network {
      downlink: number;
      effectiveType: string;
      onchange?: Event;
      rtt: number;
      saveData: boolean;
      online: boolean;
  }

  export interface Memory {
      kb: number;
  }

  export function getCPU(): CPU;

  export function getGPU(): GPU;

  export function getMEM(): Memory;

  export const defaultNetwork: Network;

  export function getNET(): Network;

  export function getDeviceInfo(): DeviceInfo;

  export class ArcFetchCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
      getItems(term: ArcTerminal): [
          string,
          string
      ][];
      graphic(term: ArcTerminal): void;
      colorBar(term: ArcTerminal): void;
  }

  export class AtConfCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class CdCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class ClearCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class ConfigCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class CrTpaCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class DevenvCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      commands: Record<string, (term: ArcTerminal, flags: Arguments, argv: string[]) => Promise<number>>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
      connect(term: ArcTerminal, _: Arguments, argv: string[]): Promise<number>;
      disconnect(term: ArcTerminal): Promise<0 | 1>;
  }

  export class DirCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class DispatchCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments): Promise<number>;
  }

  export class DrivesCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class EchoCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class ExitCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class ExploreCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class SelectionList {
      private terminal;
      private items;
      selectedIndex: number;
      private prompt;
      private resolve;
      private keyListener;
      private visibleItems;
      private scrollOffset;
      private promptLines;
      private scrollIndicatorSpace;
      private isDrawn;
      private totalDrawnLines;
      constructor(terminal: Terminal, items: string[], prompt?: string);
      private calculatePromptLines;
      show(): Promise<string | undefined>;
      private cleanup;
      private updateVisibleItems;
      private ensureSelectionVisible;
      private draw;
      private moveUp;
      private moveDown;
      private moveToTop;
      private moveToBottom;
      private pageUp;
      private pageDown;
      private redraw;
      private clearList;
  }

  export class FindCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class HelpCommand extends TerminalProcess {
      static description: string;
      static keyword: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments): Promise<number>;
  }

  export class HistoryCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class KillCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class LogoutCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class MkdirCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class OpenCommand extends TerminalProcess {
      static description: string;
      static keyword: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class QuotaCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class ReloadCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class RestartCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class RmCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class ShutdownCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class SpawnCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, _: Arguments, argv: string[]): Promise<number>;
  }

  export class TasksCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class TestCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      static hidden: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export class TreeCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal, flags: Arguments, argv: string[]): Promise<number>;
  }

  export class VerCommand extends TerminalProcess {
      static keyword: string;
      static description: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number);
      protected main(term: ArcTerminal): Promise<number>;
  }

  export const TerminalCommandStore: (typeof TerminalProcess)[];

  export const ESC = "\u001B[";

  export const BLACK = "\u001B[30m";

  export const RED = "\u001B[31m";

  export const GREEN = "\u001B[32m";

  export const YELLOW = "\u001B[33m";

  export const BLUE = "\u001B[34m";

  export const PURPLE = "\u001B[35m";

  export const CYAN = "\u001B[36m";

  export const WHITE = "\u001B[37m";

  export const BRBLACK = "\u001B[90m";

  export const BRRED = "\u001B[91m";

  export const BRGREEN = "\u001B[92m";

  export const BRYELLOW = "\u001B[93m";

  export const BRBLUE = "\u001B[94m";

  export const BRPURPLE = "\u001B[95m";

  export const BRCYAN = "\u001B[96m";

  export const BRWHITE = "\u001B[97m";

  export const RESET = "\u001B[0m";

  export const BOLD = "\u001B[1m";

  export const DIM = "\u001B[2m";

  export const UNDERLINE = "\u001B[4m";

  export const INVERTED = "\u001B[7m";

  export const HIDDEN = "\u001B[8m";

  export const DefaultArcTermConfiguration: ArcTermConfiguration;

  export function getArcTermStore(term: ArcTerminal): VariableStore;

  export class ArcTermVariables {
      term: ArcTerminal;
      private store;
      constructor(t: ArcTerminal);
      getAll(): StaticVariableStore;
      get(key: string): string | undefined;
      set(key: string, value: string): Promise<boolean>;
      delete(key: string): Promise<boolean>;
      replace(str: string): string;
      private parseInlineNames;
  }

  export class ArcTerminal extends Process {
      path: string;
      drive: FilesystemDrive | undefined;
      term: Terminal;
      rl: Readline | undefined;
      var: ArcTermVariables | undefined;
      contents: DirectoryReadReturn | undefined;
      daemon: UserDaemon | undefined;
      ansiEscapes: typeof ansiEscapes;
      lastCommandErrored: boolean;
      config: ArcTermConfiguration;
      window: TerminalWindowRuntime | undefined;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, term: Terminal, path?: string);
      start(): Promise<void>;
      readline(): Promise<void>;
      processLine(text: string | undefined): Promise<void>;
      join(path?: string): string;
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean | undefined>;
      writeFile(path: string, data: Blob): Promise<boolean | undefined>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean | undefined>;
      moveItem(source: string, destination: string): Promise<boolean | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      deleteItem(path: string): Promise<boolean | undefined>;
      Error(message: string, prefix?: string): Promise<void>;
      Warning(message: string, prefix?: string): Promise<void>;
      Info(message: string, prefix?: string): Promise<void>;
      changeDirectory(path: string): Promise<boolean | undefined>;
      parseFlags(args: string): [
          Arguments,
          string
      ];
      stop(): Promise<any>;
      elevate(data: ElevationData): Promise<boolean>;
      readConfig(): Promise<void>;
      writeConfig(): Promise<void>;
      reload(): Promise<void>;
      tryGetTermWindow(): void;
  }

  export class ArcTermRuntime extends Process {
      term: ArcTerminal | undefined;
      path: string | undefined;
      app: AppProcessData;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path?: string);
      protected start(): Promise<any>;
  }

  export const ArcTermApp: App;

  export interface BugHuntCreatorOptions {
      sendAnonymously: boolean;
      excludeLogs: boolean;
      makePublic: boolean;
  }

  export class BugHuntCreatorRuntime extends AppProcess {
      parent: BugHuntRuntime | undefined;
      title: ReadableStore<string>;
      body: ReadableStore<string>;
      loading: ReadableStore<boolean>;
      overrideOptions: BugHuntCreatorOptions | undefined;
      bughunt: BugHuntUserSpaceProcess;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, title?: string, body?: string, options?: BugHuntCreatorOptions);
      Send(): Promise<void>;
      dataPrivacy(): Promise<void>;
  }

  export const BugReportsCreatorApp: App;

  export const BugHuntAltMenu: (p: BugHuntRuntime) => ContextMenuItem[];

  export class BugHuntUserDataRuntime extends AppProcess {
      data: UserInfo;
      hljs: HLJSApi;
      html: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, data: UserInfo);
  }

  export const BugHuntUserDataApp: App;

  export class BugHuntRuntime extends AppProcess {
      loading: ReadableStore<boolean>;
      currentTab: ReadableStore<string>;
      store: ReadableStore<BugReport[]>;
      selectedReport: ReadableStore<string>;
      bughunt: BugHuntUserSpaceProcess;
      protected overlayStore: Record<string, App>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      changeTab(tab: string): Promise<void>;
      refresh(tab?: string): Promise<void>;
      invalidateCaches(restoreSelected?: boolean): Promise<void>;
      newReport(): void;
      viewLogs(): void;
      userData(): void;
      exportReport(): Promise<void>;
  }

  export const BugHuntApp: App;

  export type CalculatorKey = [
      string | null,
      string | null
  ];

  export type CalculatorKeys = [
      string | null,
      string | null
  ][];

  export type CalculatorOverrides = {
      [key: string]: string;
  };

  export class CalculatorStore {
      AllowedKeys: string[];
      Shortcuts: string[];
      Overrides: CalculatorOverrides;
      altClasses: string[];
  }

  export class CalculatorRuntime extends AppProcess {
      Value: ReadableStore<string>;
      Store: CalculatorStore;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(args: RenderArgs): Promise<void>;
      keys: CalculatorKeys;
      Functions: {
          [key: string]: [
              string,
              () => void,
              string
          ];
      };
      private eval;
      private compileKeys;
      evaluate(): string | false;
      private isValid;
      generateKeyboardShortcuts(): AppKeyCombination[];
      processKey(key: string): false | undefined;
      validate(expr: string): boolean;
  }

  export const CalculatorApp: App;

  export const FileManagerApp: App;

  export class EditRowRuntime extends AppProcess {
      view: ReadableStore<Uint8Array<ArrayBufferLike>>;
      output: ReadableStore<Uint8Array<ArrayBufferLike>>;
      offset: ReadableStore<number>;
      rows: ReadableStore<[
          number,
          [
              number,
              number
          ][]
      ][]>;
      editorInputs: ReadableStore<HTMLInputElement[]>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, view: ReadableStore<Uint8Array>, offset: number);
      render(): Promise<void>;
      getByteClass(byte: number): "nul" | "ascii-control" | "printable-ascii" | "rest";
      writeBytes(): Promise<void>;
  }

  export const EditRow: App;

  export class HexEditRuntime extends AppProcess {
      buffer: ReadableStore<ArrayBuffer>;
      original: ReadableStore<Uint8Array<ArrayBufferLike> | undefined>;
      view: ReadableStore<Uint8Array<ArrayBufferLike>>;
      offsets: ReadableStore<number[]>;
      offsetLength: ReadableStore<number>;
      hexRows: ReadableStore<[
          number,
          number
      ][][]>;
      decoded: ReadableStore<[
          string,
          number
      ][][]>;
      requestedFile: string;
      editorInputs: ReadableStore<HTMLButtonElement[]>;
      filename: ReadableStore<string>;
      activeByte: ReadableStore<number>;
      modified: ReadableStore<boolean>;
      protected overlayStore: Record<string, App>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, file: string);
      updateVariables(view: Uint8Array): void;
      saveVariables(hexRows: [
          number,
          number
      ][][], decoded: [
          string,
          number
      ][][], offsetLength: number, offsets: number[]): void;
      render(): Promise<void>;
      sanitizeDecoded(input: string): string;
      getByteClass(byte: number): "nul" | "ascii-control" | "printable-ascii" | "rest";
      newByte(): void;
      alterRow(rowIndex: number): Promise<void>;
      isModified(): boolean;
      onClose(): Promise<boolean>;
      saveFile(): Promise<void>;
  }

  export const HexEditorApp: App;

  export class ImageViewerRuntime extends AppProcess {
      openedFile: ReadableStore<string>;
      imageUrl: ReadableStore<string>;
      indirect: ReadableStore<boolean>;
      overridePopulatable: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path?: string);
      render({ path }: {
          path: string;
      }): Promise<void>;
      readFile(path: string): Promise<void>;
      readFileIndirectFallback(path: string): Promise<void>;
  }

  export const ImageViewerApp: App;

  export type LightsOffGrid = boolean[][];

  export class LightsOffLevels {
      runtime: LightsOffRuntime;
      constructor(runtime: LightsOffRuntime);
      private _store;
      loadLevel(level: number): void;
      checkNextLevel(): Promise<boolean | void>;
  }

  export class LightsOffRuntime extends AppProcess {
      xModifiers: number[];
      yModifiers: number[];
      Grid: ReadableStore<LightsOffGrid>;
      Transitioning: ReadableStore<boolean>;
      Clicks: ReadableStore<number>;
      LEVEL: ReadableStore<number>;
      Levels: LightsOffLevels;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      containsLights(): boolean;
      finish(): void;
      ToggleLight(x: number, y: number): void;
      loadData(): void;
      saveData(): void;
  }

  export const LightsOffApp: App;

  export type CollectorResult = {
      [key: string]: LogItem[];
  };

  export type IterableCollectorResult = [
      string,
      LogItem[]
  ][];

  export type FilterLevel = LogLevel | "all";

  export type GroupedBySource = Map<string, LogItem[]>;

  export type CurrentSource = ReadableStore<string>;

  export type LogSource = {
      what: string;
      timestamp: number;
  };

  export class LoggingRuntime extends AppProcess {
      groups: ReadableStore<Map<string, LogItem[]>>;
      sources: ReadableStore<LogSource[]>;
      currentSource: ReadableStore<string>;
      selectedLevel: ReadableStore<FilterLevel>;
      private archive;
      isArchive: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, source?: string, level?: FilterLevel, archive?: LogItem[]);
      updateGroups(): void;
      collectLogsBySource(logs: LogItem[], reverse?: boolean): {
          items: CollectorResult;
          sources: LogSource[];
      };
  }

  export const LoggingApp: App;

  export const MediaPlayerAccelerators: (runtime: MediaPlayerRuntime) => AppKeyCombinations;

  export function FileMenu(runtime: MediaPlayerRuntime): ContextMenuItem;

  export function PlaylistAltMenu(runtime: MediaPlayerRuntime): ContextMenuItem;

  export function MediaPlayerAltMenu(runtime: MediaPlayerRuntime): ContextMenuItem[];

  export interface PlayerState {
      paused: boolean;
      current: number;
      duration: number;
  }

  export class MediaPlayerRuntime extends AppProcess {
      queue: ReadableStore<string[]>;
      queueIndex: ReadableStore<number>;
      url: ReadableStore<string>;
      player: HTMLVideoElement | undefined;
      State: ReadableStore<PlayerState>;
      isVideo: ReadableStore<boolean>;
      Loaded: ReadableStore<boolean>;
      playlistPath: ReadableStore<string>;
      contextMenu: AppContextMenu;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, file?: string);
      onClose(): Promise<boolean>;
      protected stop(): Promise<any>;
      render({ file }: RenderArgs): Promise<void>;
      setPlayer(player: HTMLVideoElement): void;
      Reset(): void;
      Play(): Promise<void>;
      Pause(): Promise<void>;
      Seek(mod: number): void;
      Stop(): void;
      updateState(): void | {
          paused: boolean;
          current: number;
          duration: number;
      };
      formatTime(seconds: number): string | undefined;
      openFileLocation(): void;
      openFile(): Promise<void>;
      readFile(paths: string[], addToQueue?: boolean): Promise<void>;
      nextSong(): void;
      previousSong(): Promise<void>;
      clearQueue(): void;
      handleSongChange(v: number): Promise<void>;
      addToQueue(): Promise<void>;
      moveQueueItem(sourceIndex: number, targetIndex: number): void;
      savePlaylist(): Promise<void>;
      loadPlaylist(): Promise<void>;
      readPlaylist(path: string): Promise<void>;
      createPlaylistShortcut(): Promise<void>;
      failedToPlay(): Promise<void>;
  }

  export const MediaPlayerApp: App;

  export interface MessagingPage {
      name: string;
      icon: string;
      supplier: (process: MessagingAppRuntime) => Promise<PartialMessage[]> | PartialMessage[];
  }

  export const messagingPages: Record<string, MessagingPage>;

  export class MessagingAppRuntime extends AppProcess {
      service: MessagingInterface;
      page: ReadableStore<MessagingPage | undefined>;
      pageId: ReadableStore<string | undefined>;
      buffer: ReadableStore<PartialMessage[]>;
      correlated: ReadableStore<PartialMessage[][]>;
      loading: ReadableStore<boolean>;
      refreshing: ReadableStore<boolean>;
      errored: ReadableStore<boolean>;
      messageNotFound: ReadableStore<boolean>;
      message: ReadableStore<ExpandedMessage | undefined>;
      userInfoCache: Record<string, PublicUserInfo>;
      searchQuery: ReadableStore<string>;
      searchResults: ReadableStore<string[]>;
      messageWindow: boolean;
      messageFromFile: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, pageOrMessagePath?: string, messageId?: string);
      render({ page }: {
          page: string;
      }): Promise<void>;
      getInbox(): Promise<PartialMessage[]>;
      getSent(): Promise<PartialMessage[]>;
      getArchived(): Promise<PartialMessage[]>;
      getArchiveState(): string[];
      setArchiveState(state: string[]): void;
      isArchived(id: string): boolean;
      addToArchive(id: string): void;
      removeFromArchive(id: string): void;
      switchPage(id: string): Promise<void>;
      refresh(): Promise<void>;
      correlateMessages(messages: PartialMessage[]): PartialMessage[][];
      refreshFailed(): void;
      readMessage(messageId: string, force?: boolean): Promise<void>;
      userInfo(userId: string): Promise<PublicUserInfo | undefined>;
      readAttachment(attachment: MessageAttachment, messageId: string, prog: FileProgressMutator): Promise<ArrayBuffer | undefined>;
      openAttachment(attachment: MessageAttachment, messageId: string): Promise<void>;
      Search(query: string): void;
      popoutMessage(messageId: string): void;
      saveMessage(): Promise<void>;
      readMessageFromFile(path: string): Promise<void>;
      compose(): void;
      replyTo(message: ExpandedMessage): void;
      forward(message: ExpandedMessage): Promise<void>;
      toggleArchived(message: ExpandedMessage): void;
      deleteMessage(id: string): Promise<void>;
  }

  export const MessagingApp: App;

  export class PdfViewerRuntime extends AppProcess {
      openedFile: ReadableStore<string>;
      documentUrl: ReadableStore<string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path?: string);
      render({ path }: {
          path: string;
      }): Promise<void>;
      readFile(path: string): Promise<void>;
      readFileIndirectFallback(path: string): Promise<void>;
  }

  export const PdfViewerApp: App;

  export const ProcessKillResultCaptions: Record<ProcessKillResult, string>;

  export class ProcessManagerRuntime extends AppProcess {
      selected: ReadableStore<number>;
      running: ReadableStore<number>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      kill(proc: Process): Promise<void>;
      killError(name: string, result: ProcessKillResult): void;
  }

  export const ProcessesApp: App;

  export interface Box {
      modifier: number;
      class: string;
      yoffset: number;
  }

  export class QlorbRuntime extends AppProcess {
      readonly random: (m: number) => number;
      readonly Boxes: ReadableStore<Box[]>;
      readonly BoxesOffset: ReadableStore<number>;
      readonly Clicks: ReadableStore<number>;
      readonly Score: ReadableStore<number>;
      readonly OldClicks: ReadableStore<number>;
      readonly BOX_SIZE = 30;
      readonly BOX_VALUES: number[];
      readonly PAGES: string[];
      readonly CurrentPage: ReadableStore<string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      spawnBox(props?: Box | null, useOffset?: boolean, forcePositive?: boolean): Box;
      private createRandomBox;
      private findBoxClass;
      ScorePoints(box: Box, button?: HTMLButtonElement): void;
      ScoreNegativePoints(box: Box, button?: HTMLButtonElement): void;
      private levelDown;
      clickReset(): void;
      flushStores(): void;
      onSwitchPage(): void;
      switchPage(page: string): boolean;
  }

  export const QlorbApp: App;

  export const SystemSettings: App;

  export class TestAppRuntime extends AppProcess {
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
  }

  export const TestApp: App;

  export function WriterAccelerators(runtime: WriterRuntime): AppKeyCombinations;

  export function EditMenu(runtime: WriterRuntime): ContextMenuItem;

  export function FileMenu(runtime: WriterRuntime): ContextMenuItem;

  export function ViewMenu(runtime: WriterRuntime): ContextMenuItem;

  export function WriterAltMenu(runtime: WriterRuntime): ContextMenuItem[];

  export class ReplaceRuntime extends AppProcess {
      parent: WriterRuntime;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      replaceOnce(text: string, replacer: string): void;
      replaceAll(text: string, replacer: string): void;
  }

  export const ReplaceOverlay: App;

  export class WriterRuntime extends AppProcess {
      buffer: ReadableStore<string>;
      openedFile: ReadableStore<string>;
      filename: ReadableStore<string>;
      mimetype: ReadableStore<string>;
      directoryName: ReadableStore<string>;
      original: ReadableStore<string>;
      input: ReadableStore<HTMLTextAreaElement>;
      mimeIcon: ReadableStore<string>;
      protected overlayStore: Record<string, App>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, path?: string);
      acceleratorStore: AppKeyCombinations;
      render({ path }: {
          path: string;
      }): Promise<void>;
      readFile(path: string): Promise<void>;
      onClose(): Promise<boolean>;
      saveChanges(force?: boolean): Promise<void>;
      saveAs(): Promise<void>;
      openFile(): Promise<void>;
      selectAll(): void;
  }

  export const WriterApp: App;

  export const BuiltinApps: AppStorage;

  export const AdminApps: AppStorage;

  export const appShortcuts: [
      number,
      AppKeyCombinations
  ][];

  export const AppOrigins: Record<string, string>;

  export function lightenColor(color: string, modifier?: number): string;

  export function hex3to6(color: string): string;

  export function darkenColor(color: string, modifier?: number): string;

  export function invertColor(hex: string): string;

  export class ServerDrive extends FilesystemDrive {
      private token;
      label: string;
      FIXED: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      constructor(kernel: WaveKernel, uuid: string, letter: string, token: string);
      readDir(path?: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string, onProgress: FilesystemProgressCallback): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, blob: Blob, onProgress: FilesystemProgressCallback): Promise<boolean>;
      tree(path?: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      quota(): Promise<UserQuota>;
      direct(path: string): Promise<string | undefined>;
      bulk<T = any>(path: string, extension: string): Promise<Record<string, T>>;
  }

  export class ZIPDrive extends FilesystemDrive {
      label: string;
      private _buffer;
      private _path;
      REMOVABLE: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_SHORT: string;
      FILESYSTEM_LONG: string;
      constructor(kernel: WaveKernel, uuid: string, letter: string, path: string);
      _spinUp(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      _spinDown(onProgress?: FilesystemProgressCallback): Promise<boolean>;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob, onProgress?: FilesystemProgressCallback): Promise<boolean>;
      createDirectory(path: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      _sync(progress?: FilesystemProgressCallback): Promise<void>;
  }

  export const Wallpapers: {
      [key: string]: Wallpaper;
  };

  export interface LoginActivity {
      authorId: string;
      token?: string;
      userAgent: string;
      location?: Location;
      action: "unknown" | "login" | "logout";
      _id: string;
      createdAt: string;
      updatedAt: string;
  }

  export interface BatteryType {
      charging: boolean;
      chargingTime: number;
      dischargingTime: number;
      level: number;
      onchargingchange: number | null;
      onchargingtimechange: number | null;
      ondischargingtimechange: number | null;
      onlevelchange: number | null;
  }

  export interface Notification {
      title: string;
      message: string;
      icon?: string;
      image?: string;
      timeout?: number;
      buttons?: ErrorButton[];
      timestamp?: number;
      deleted?: boolean;
      className?: string;
  }

  export interface ErrorButton {
      caption: string;
      action: () => void;
      suggested?: boolean;
  }

  export const DefaultUserPreferences: UserPreferences;

  export const DefaultUserInfo: UserInfo;

  export function SupplementaryThirdPartyPropFunctions(daemon: UserDaemon, fs: Filesystem, app: App, props: any, wrap: (c: string) => string, args: any[], metaPath: string): {
      load: (path: string) => Promise<any>;
      runApp: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<ThirdPartyAppProcess | undefined>;
      runAppDirect: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<ThirdPartyAppProcess | undefined>;
      loadHtml: (path: string) => Promise<string>;
      loadDirect: (path: string) => Promise<void>;
  };

  export type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null;

  export interface RawAxiosHeaders {
      [key: string]: AxiosHeaderValue;
  }

  export type MethodsHeaders = Partial<{
      [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & {
      common: AxiosHeaders;
  }>;

  export type AxiosHeaderMatcher = string | RegExp | ((this: AxiosHeaders, value: string, name: string) => boolean);

  export type AxiosHeaderParser = (this: AxiosHeaders, value: AxiosHeaderValue, header: string) => any;

  export class AxiosHeaders {
      constructor(headers?: RawAxiosHeaders | AxiosHeaders | string);
      [key: string]: any;
      set(headerName?: string, value?: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      set(headers?: RawAxiosHeaders | AxiosHeaders | string, rewrite?: boolean): AxiosHeaders;
      get(headerName: string, parser: RegExp): RegExpExecArray | null;
      get(headerName: string, matcher?: true | AxiosHeaderParser): AxiosHeaderValue;
      has(header: string, matcher?: AxiosHeaderMatcher): boolean;
      delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;
      clear(matcher?: AxiosHeaderMatcher): boolean;
      normalize(format: boolean): AxiosHeaders;
      concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
      toJSON(asStrings?: boolean): RawAxiosHeaders;
      static from(thing?: AxiosHeaders | RawAxiosHeaders | string): AxiosHeaders;
      static accessor(header: string | string[]): AxiosHeaders;
      static concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
      setContentType(value: ContentType, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getContentType(parser?: RegExp): RegExpExecArray | null;
      getContentType(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasContentType(matcher?: AxiosHeaderMatcher): boolean;
      setContentLength(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getContentLength(parser?: RegExp): RegExpExecArray | null;
      getContentLength(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasContentLength(matcher?: AxiosHeaderMatcher): boolean;
      setAccept(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getAccept(parser?: RegExp): RegExpExecArray | null;
      getAccept(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasAccept(matcher?: AxiosHeaderMatcher): boolean;
      setUserAgent(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getUserAgent(parser?: RegExp): RegExpExecArray | null;
      getUserAgent(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasUserAgent(matcher?: AxiosHeaderMatcher): boolean;
      setContentEncoding(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getContentEncoding(parser?: RegExp): RegExpExecArray | null;
      getContentEncoding(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasContentEncoding(matcher?: AxiosHeaderMatcher): boolean;
      setAuthorization(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
      getAuthorization(parser?: RegExp): RegExpExecArray | null;
      getAuthorization(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
      hasAuthorization(matcher?: AxiosHeaderMatcher): boolean;
      [Symbol.iterator](): IterableIterator<[
          string,
          AxiosHeaderValue
      ]>;
  }

  export type CommonRequestHeadersList = "Accept" | "Content-Length" | "User-Agent" | "Content-Encoding" | "Authorization";

  export type ContentType = AxiosHeaderValue | "text/html" | "text/plain" | "multipart/form-data" | "application/json" | "application/x-www-form-urlencoded" | "application/octet-stream";

  export type RawAxiosRequestHeaders = Partial<RawAxiosHeaders & {
      [Key in CommonRequestHeadersList]: AxiosHeaderValue;
  } & {
      "Content-Type": ContentType;
  }>;

  export type AxiosRequestHeaders = RawAxiosRequestHeaders & AxiosHeaders;

  export type CommonResponseHeadersList = "Server" | "Content-Type" | "Content-Length" | "Cache-Control" | "Content-Encoding";

  export type RawCommonResponseHeaders = {
      [Key in CommonResponseHeadersList]: AxiosHeaderValue;
  } & {
      "set-cookie": string[];
  };

  export type RawAxiosResponseHeaders = Partial<RawAxiosHeaders & RawCommonResponseHeaders>;

  export type AxiosResponseHeaders = RawAxiosResponseHeaders & AxiosHeaders;

  export interface AxiosRequestTransformer {
      (this: InternalAxiosRequestConfig, data: any, headers: AxiosRequestHeaders): any;
  }

  export interface AxiosResponseTransformer {
      (this: InternalAxiosRequestConfig, data: any, headers: AxiosResponseHeaders, status?: number): any;
  }

  export interface AxiosAdapter {
      (config: InternalAxiosRequestConfig): AxiosPromise;
  }

  export interface AxiosBasicCredentials {
      username: string;
      password: string;
  }

  export interface AxiosProxyConfig {
      host: string;
      port: number;
      auth?: AxiosBasicCredentials;
      protocol?: string;
  }

  export enum HttpStatusCode {
      Continue = 100,
      SwitchingProtocols = 101,
      Processing = 102,
      EarlyHints = 103,
      Ok = 200,
      Created = 201,
      Accepted = 202,
      NonAuthoritativeInformation = 203,
      NoContent = 204,
      ResetContent = 205,
      PartialContent = 206,
      MultiStatus = 207,
      AlreadyReported = 208,
      ImUsed = 226,
      MultipleChoices = 300,
      MovedPermanently = 301,
      Found = 302,
      SeeOther = 303,
      NotModified = 304,
      UseProxy = 305,
      Unused = 306,
      TemporaryRedirect = 307,
      PermanentRedirect = 308,
      BadRequest = 400,
      Unauthorized = 401,
      PaymentRequired = 402,
      Forbidden = 403,
      NotFound = 404,
      MethodNotAllowed = 405,
      NotAcceptable = 406,
      ProxyAuthenticationRequired = 407,
      RequestTimeout = 408,
      Conflict = 409,
      Gone = 410,
      LengthRequired = 411,
      PreconditionFailed = 412,
      PayloadTooLarge = 413,
      UriTooLong = 414,
      UnsupportedMediaType = 415,
      RangeNotSatisfiable = 416,
      ExpectationFailed = 417,
      ImATeapot = 418,
      MisdirectedRequest = 421,
      UnprocessableEntity = 422,
      Locked = 423,
      FailedDependency = 424,
      TooEarly = 425,
      UpgradeRequired = 426,
      PreconditionRequired = 428,
      TooManyRequests = 429,
      RequestHeaderFieldsTooLarge = 431,
      UnavailableForLegalReasons = 451,
      InternalServerError = 500,
      NotImplemented = 501,
      BadGateway = 502,
      ServiceUnavailable = 503,
      GatewayTimeout = 504,
      HttpVersionNotSupported = 505,
      VariantAlsoNegotiates = 506,
      InsufficientStorage = 507,
      LoopDetected = 508,
      NotExtended = 510,
      NetworkAuthenticationRequired = 511
  }

  export type Method = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK";

  export type ResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" | "formdata";

  export type responseEncoding = "ascii" | "ASCII" | "ansi" | "ANSI" | "binary" | "BINARY" | "base64" | "BASE64" | "base64url" | "BASE64URL" | "hex" | "HEX" | "latin1" | "LATIN1" | "ucs-2" | "UCS-2" | "ucs2" | "UCS2" | "utf-8" | "UTF-8" | "utf8" | "UTF8" | "utf16le" | "UTF16LE";

  export interface TransitionalOptions {
      silentJSONParsing?: boolean;
      forcedJSONParsing?: boolean;
      clarifyTimeoutError?: boolean;
  }

  export interface GenericAbortSignal {
      readonly aborted: boolean;
      onabort?: ((...args: any) => any) | null;
      addEventListener?: (...args: any) => any;
      removeEventListener?: (...args: any) => any;
  }

  export interface FormDataVisitorHelpers {
      defaultVisitor: SerializerVisitor;
      convertValue: (value: any) => any;
      isVisitable: (value: any) => boolean;
  }

  export interface SerializerVisitor {
      (this: GenericFormData, value: any, key: string | number, path: null | Array<string | number>, helpers: FormDataVisitorHelpers): boolean;
  }

  export interface SerializerOptions {
      visitor?: SerializerVisitor;
      dots?: boolean;
      metaTokens?: boolean;
      indexes?: boolean | null;
  }

  export interface FormSerializerOptions extends SerializerOptions {
  }

  export interface ParamEncoder {
      (value: any, defaultEncoder: (value: any) => any): any;
  }

  export interface CustomParamsSerializer {
      (params: Record<string, any>, options?: ParamsSerializerOptions): string;
  }

  export interface ParamsSerializerOptions extends SerializerOptions {
      encode?: ParamEncoder;
      serialize?: CustomParamsSerializer;
  }

  export type MaxUploadRate = number;

  export type MaxDownloadRate = number;

  export type BrowserProgressEvent = any;

  export interface AxiosProgressEvent {
      loaded: number;
      total?: number;
      progress?: number;
      bytes: number;
      rate?: number;
      estimated?: number;
      upload?: boolean;
      download?: boolean;
      event?: BrowserProgressEvent;
      lengthComputable: boolean;
  }

  export type Milliseconds = number;

  export type AxiosAdapterName = "fetch" | "xhr" | "http" | string;

  export type AxiosAdapterConfig = AxiosAdapter | AxiosAdapterName;

  export type AddressFamily = 4 | 6 | undefined;

  export interface LookupAddressEntry {
      address: string;
      family?: AddressFamily;
  }

  export type LookupAddress = string | LookupAddressEntry;

  export interface AxiosRequestConfig<D = any> {
      url?: string;
      method?: Method | string;
      baseURL?: string;
      transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
      transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
      headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
      params?: any;
      paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer;
      data?: D;
      timeout?: Milliseconds;
      timeoutErrorMessage?: string;
      withCredentials?: boolean;
      adapter?: AxiosAdapterConfig | AxiosAdapterConfig[];
      auth?: AxiosBasicCredentials;
      responseType?: ResponseType;
      responseEncoding?: responseEncoding | string;
      xsrfCookieName?: string;
      xsrfHeaderName?: string;
      onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
      onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
      maxContentLength?: number;
      validateStatus?: ((status: number) => boolean) | null;
      maxBodyLength?: number;
      maxRedirects?: number;
      maxRate?: number | [
          MaxUploadRate,
          MaxDownloadRate
      ];
      beforeRedirect?: (options: Record<string, any>, responseDetails: {
          headers: Record<string, string>;
          statusCode: HttpStatusCode;
      }) => void;
      socketPath?: string | null;
      transport?: any;
      httpAgent?: any;
      httpsAgent?: any;
      proxy?: AxiosProxyConfig | false;
      cancelToken?: CancelToken;
      decompress?: boolean;
      transitional?: TransitionalOptions;
      signal?: GenericAbortSignal;
      insecureHTTPParser?: boolean;
      env?: {
          FormData?: new (...args: any[]) => object;
      };
      formSerializer?: FormSerializerOptions;
      family?: AddressFamily;
      lookup?: ((hostname: string, options: object, cb: (err: Error | null, address: LookupAddress | LookupAddress[], family?: AddressFamily) => void) => void) | ((hostname: string, options: object) => Promise<[
          address: LookupAddressEntry | LookupAddressEntry[],
          family?: AddressFamily
      ] | LookupAddress>);
      withXSRFToken?: boolean | ((config: InternalAxiosRequestConfig) => boolean | undefined);
      fetchOptions?: Record<string, any>;
  }

  export type RawAxiosRequestConfig<D = any> = AxiosRequestConfig<D>;

  export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
      headers: AxiosRequestHeaders;
  }

  export interface HeadersDefaults {
      common: RawAxiosRequestHeaders;
      delete: RawAxiosRequestHeaders;
      get: RawAxiosRequestHeaders;
      head: RawAxiosRequestHeaders;
      post: RawAxiosRequestHeaders;
      put: RawAxiosRequestHeaders;
      patch: RawAxiosRequestHeaders;
      options?: RawAxiosRequestHeaders;
      purge?: RawAxiosRequestHeaders;
      link?: RawAxiosRequestHeaders;
      unlink?: RawAxiosRequestHeaders;
  }

  export interface AxiosDefaults<D = any> extends Omit<AxiosRequestConfig<D>, "headers"> {
      headers: HeadersDefaults;
  }

  export interface CreateAxiosDefaults<D = any> extends Omit<AxiosRequestConfig<D>, "headers"> {
      headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
  }

  export interface AxiosResponse<T = any, D = any> {
      data: T;
      status: number;
      statusText: string;
      headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
      config: InternalAxiosRequestConfig<D>;
      request?: any;
  }

  export class AxiosError<T = unknown, D = any> extends Error {
      constructor(message?: string, code?: string, config?: InternalAxiosRequestConfig<D>, request?: any, response?: AxiosResponse<T, D>);
      config?: InternalAxiosRequestConfig<D>;
      code?: string;
      request?: any;
      response?: AxiosResponse<T, D>;
      isAxiosError: boolean;
      status?: number;
      toJSON: () => object;
      cause?: Error;
      static from<T = unknown, D = any>(error: Error | unknown, code?: string, config?: InternalAxiosRequestConfig<D>, request?: any, response?: AxiosResponse<T, D>, customProps?: object): AxiosError<T, D>;
      static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
      static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
      static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
      static readonly ERR_NETWORK = "ERR_NETWORK";
      static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
      static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
      static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
      static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
      static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
      static readonly ERR_CANCELED = "ERR_CANCELED";
      static readonly ECONNABORTED = "ECONNABORTED";
      static readonly ETIMEDOUT = "ETIMEDOUT";
  }

  export class CanceledError<T> extends AxiosError<T> {
  }

  export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;

  export interface CancelStatic {
      new (message?: string): Cancel;
  }

  export interface Cancel {
      message: string | undefined;
  }

  export interface Canceler {
      (message?: string, config?: AxiosRequestConfig, request?: any): void;
  }

  export interface CancelTokenStatic {
      new (executor: (cancel: Canceler) => void): CancelToken;
      source(): CancelTokenSource;
  }

  export interface CancelToken {
      promise: Promise<Cancel>;
      reason?: Cancel;
      throwIfRequested(): void;
  }

  export interface CancelTokenSource {
      token: CancelToken;
      cancel: Canceler;
  }

  export interface AxiosInterceptorOptions {
      synchronous?: boolean;
      runWhen?: (config: InternalAxiosRequestConfig) => boolean;
  }

  export type AxiosRequestInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null, options?: AxiosInterceptorOptions) => number;

  export type AxiosResponseInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null) => number;

  export interface AxiosInterceptorManager<V> {
      use: V extends AxiosResponse ? AxiosResponseInterceptorUse<V> : AxiosRequestInterceptorUse<V>;
      eject(id: number): void;
      clear(): void;
  }

  export class Axios {
      constructor(config?: AxiosRequestConfig);
      defaults: AxiosDefaults;
      interceptors: {
          request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
          response: AxiosInterceptorManager<AxiosResponse>;
      };
      getUri(config?: AxiosRequestConfig): string;
      request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
      get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
      patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  }

  export interface AxiosInstance extends Axios {
      <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
      <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      defaults: Omit<AxiosDefaults, "headers"> & {
          headers: HeadersDefaults & {
              [key: string]: AxiosHeaderValue;
          };
      };
  }

  export interface GenericFormData {
      append(name: string, value: any, options?: any): any;
  }

  export interface GenericHTMLFormElement {
      name: string;
      method: string;
      submit(): void;
  }

  export function getAdapter(adapters: AxiosAdapterConfig | AxiosAdapterConfig[] | undefined): AxiosAdapter;

  export function toFormData(sourceObj: object, targetFormData?: GenericFormData, options?: FormSerializerOptions): GenericFormData;

  export function formToJSON(form: GenericFormData | GenericHTMLFormElement): object;

  export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;

  export function spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;

  export function isCancel(value: any): value is Cancel;

  export function all<T>(values: Array<T | Promise<T>>): Promise<T[]>;

  export function mergeConfig<D = any>(config1: AxiosRequestConfig<D>, config2: AxiosRequestConfig<D>): AxiosRequestConfig<D>;

  export interface AxiosStatic extends AxiosInstance {
      create(config?: CreateAxiosDefaults): AxiosInstance;
      Cancel: CancelStatic;
      CancelToken: CancelTokenStatic;
      Axios: typeof Axios;
      AxiosError: typeof AxiosError;
      HttpStatusCode: typeof HttpStatusCode;
      readonly VERSION: string;
      isCancel: typeof isCancel;
      all: typeof all;
      spread: typeof spread;
      isAxiosError: typeof isAxiosError;
      toFormData: typeof toFormData;
      formToJSON: typeof formToJSON;
      getAdapter: typeof getAdapter;
      CanceledError: typeof CanceledError;
      AxiosHeaders: typeof AxiosHeaders;
      mergeConfig: typeof mergeConfig;
  }

  export const axios: AxiosStatic;

  export function dayjs(date?: dayjs.ConfigType): dayjs.Dayjs;

  export function dayjs(date?: dayjs.ConfigType, format?: dayjs.OptionType, strict?: boolean): dayjs.Dayjs;

  export function dayjs(date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs;

  export namespace dayjs {
      interface ConfigTypeMap {
          default: string | number | Date | Dayjs | null | undefined;
      }
      type ConfigType = ConfigTypeMap[keyof ConfigTypeMap];
      interface FormatObject {
          locale?: string;
          format?: string;
          utc?: boolean;
      }
      type OptionType = FormatObject | string | string[];
      type UnitTypeShort = "d" | "D" | "M" | "y" | "h" | "m" | "s" | "ms";
      type UnitTypeLong = "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date";
      type UnitTypeLongPlural = "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years" | "dates";
      type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort;
      type OpUnitType = UnitType | "week" | "weeks" | "w";
      type QUnitType = UnitType | "quarter" | "quarters" | "Q";
      type ManipulateType = Exclude<OpUnitType, "date" | "dates">;
      class Dayjs {
          constructor(config?: ConfigType);
          clone(): Dayjs;
          isValid(): boolean;
          year(): number;
          year(value: number): Dayjs;
          month(): number;
          month(value: number): Dayjs;
          date(): number;
          date(value: number): Dayjs;
          day(): 0 | 1 | 2 | 3 | 4 | 5 | 6;
          day(value: number): Dayjs;
          hour(): number;
          hour(value: number): Dayjs;
          minute(): number;
          minute(value: number): Dayjs;
          second(): number;
          second(value: number): Dayjs;
          millisecond(): number;
          millisecond(value: number): Dayjs;
          set(unit: UnitType, value: number): Dayjs;
          get(unit: UnitType): number;
          add(value: number, unit?: ManipulateType): Dayjs;
          subtract(value: number, unit?: ManipulateType): Dayjs;
          startOf(unit: OpUnitType): Dayjs;
          endOf(unit: OpUnitType): Dayjs;
          format(template?: string): string;
          diff(date?: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number;
          valueOf(): number;
          unix(): number;
          daysInMonth(): number;
          toDate(): Date;
          toJSON(): string;
          toISOString(): string;
          toString(): string;
          utcOffset(): number;
          isBefore(date?: ConfigType, unit?: OpUnitType): boolean;
          isSame(date?: ConfigType, unit?: OpUnitType): boolean;
          isAfter(date?: ConfigType, unit?: OpUnitType): boolean;
          locale(): string;
          locale(preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
      }
      type PluginFunc<T = unknown> = (option: T, c: typeof Dayjs, d: typeof dayjs) => void;
      function extend<T = unknown>(plugin: PluginFunc<T>, option?: T): Dayjs;
      function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string;
      function isDayjs(d: any): d is Dayjs;
      function unix(t: number): Dayjs;
      const Ls: {
          [key: string]: ILocale;
      };
  }

  export interface ThirdPartyPropMap {
      kernel: WaveKernel;
      daemon: UserDaemon;
      handler: ProcessHandler;
      fs: Filesystem;
      env: Environment;
      serviceHost: ServiceHost | undefined;
      dispatch: SystemDispatch;
      icons: Record<string, string>;
      util: {
          htmlspecialchars: typeof htmlspecialchars;
          Plural: typeof Plural;
          sliceIntoChunks: typeof sliceIntoChunks;
          decimalToHex: typeof decimalToHex;
          sha256: typeof sha256;
          CountInstances: typeof CountInstances;
          join: typeof join;
          getItemNameFromPath: typeof getItemNameFromPath;
          getParentDirectory: typeof getParentDirectory;
          getDriveLetter: typeof getDriveLetter;
          formatBytes: typeof formatBytes;
          DownloadFile: typeof DownloadFile;
          onFileChange: typeof onFileChange;
          onFolderChange: typeof onFolderChange;
      };
      convert: {
          arrayToText: typeof arrayToText;
          textToArrayBuffer: typeof textToArrayBuffer;
          blobToText: typeof blobToText;
          textToBlob: typeof textToBlob;
          arrayToBlob: typeof arrayToBlob;
          blobToDataURL: typeof blobToDataURL;
      };
      workingDirectory: string;
      argv: any[];
      app: App;
      $ENTRYPOINT: string;
      $METADATA: string;
      load: (path: string) => Promise<any>;
      runApp: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<ThirdPartyAppProcess | undefined>;
      runAppDirect: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<ThirdPartyAppProcess | undefined>;
      loadHtml: (path: string) => Promise<string | undefined>;
      loadDirect: (path: string) => Promise<string | undefined>;
      Server: AxiosInstance;
      Debug: (m: any) => void;
      dayjs: (s: string) => dayjs.Dayjs;
      [key: string]: any;
  }

  export function contextProps(node: HTMLElement, args: any[]): void;

  export class CustomTitlebar {
      #private;
      constructor(process: AppProcess, className?: string);
      render(target: HTMLElement): void;
      dispose(): void;
      getTarget(): HTMLElement | undefined;
      getTitlebar(): HTMLDivElement | undefined;
  }

  export function ThirdPartyProps(daemon: UserDaemon, args: any[], app: App, wrap: (c: string) => string, metaPath: string, workingDirectory?: string): ThirdPartyPropMap;

  export class UserDaemon extends Process {
      initialized: boolean;
      username: string;
      token: string;
      preferences: ReadableStore<UserPreferences>;
      notifications: Map<string, Notification>;
      userInfo: UserInfo;
      battery: ReadableStore<BatteryType | undefined>;
      serviceHost: ServiceHost | undefined;
      Wallpaper: ReadableStore<Wallpaper>;
      lastWallpaper: ReadableStore<string>;
      _elevating: boolean;
      private elevations;
      private preferencesUnsubscribe;
      private wallpaperGetters;
      private localWallpaperCache;
      private virtualDesktops;
      private virtualDesktop;
      private virtualDesktopIndex;
      private mimeIcons;
      private virtualdesktopChangingTimeout;
      private firstSyncDone;
      safeMode: boolean;
      fileHandlers: Record<string, FileHandler>;
      _criticalProcess: boolean;
      mountedDrives: string[];
      server: ServerManager;
      syncLock: boolean;
      autoLoadComplete: boolean;
      globalDispatch?: GlobalDispatch;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, token: string, username: string, userInfo?: UserInfo);
      startApplicationStorage(): Promise<void>;
      getUserInfo(): Promise<UserInfo | undefined>;
      startPreferencesSync(): Promise<void>;
      updateWallpaper(v: UserPreferences): Promise<void>;
      getAppRendererStyle(accent: string): string;
      setAppRendererClasses(v: UserPreferences): void;
      setUserStyleLoader(style: CustomStylePreferences): void;
      commitPreferences(preferences: UserPreferences): Promise<boolean | undefined>;
      startFilesystemSupplier(): Promise<void>;
      stop(): Promise<void>;
      sanitizeUserPreferences(): Promise<void>;
      discontinueToken(token?: string): Promise<boolean | undefined>;
      sendNotification(data: Notification): string | undefined;
      deleteNotification(id: string): void;
      clearNotifications(): void;
      themeFromUserPreferences(data: UserPreferences, name: string, author: string, version: string): UserTheme;
      saveCurrentTheme(name: string): void;
      applyThemeData(data: UserTheme, id?: string): false | undefined;
      applySavedTheme(id: string): void;
      verifyTheme(data: UserTheme): string | undefined;
      checkCurrentThemeIdValidity(data: UserPreferences): UserPreferences;
      deleteUserTheme(id: string): void;
      uploadWallpaper(pid?: number): Promise<Wallpaper | undefined>;
      uploadProfilePicture(): Promise<string | undefined>;
      getWallpaper(id: string, override?: string): Promise<Wallpaper>;
      deleteLocalWallpaper(id: string): Promise<boolean>;
      getLocalWallpaper(id: string): Promise<Wallpaper>;
      logoff(): Promise<void>;
      shutdown(): Promise<void>;
      restart(): Promise<void>;
      logoffSafeMode(): Promise<void>;
      toLogin(type: string, props?: Record<string, any>): Promise<void>;
      mountZip(path: string, letter?: string, fromSystem?: boolean): Promise<false | FilesystemDrive | undefined>;
      batteryInfo(): Promise<BatteryType | undefined>;
      startSystemStatusRefresh(): Promise<void>;
      getUserApps(): Promise<AppStorage>;
      spawnApp<T>(id: string, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      spawnOverlay<T>(id: string, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      _spawnApp<T>(id: string, renderTarget?: HTMLDivElement | undefined, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      _spawnOverlay<T>(id: string, renderTarget?: HTMLDivElement | undefined, parentPid?: number, ...args: any[]): Promise<T | undefined>;
      spawnThirdParty<T>(app: App, metaPath: string, ...args: any[]): Promise<T | undefined>;
      spawnAutoload(): Promise<void>;
      checkDisabled(appId: string, noSafeMode?: boolean): boolean;
      isVital(app: App): boolean | undefined;
      disableApp(appId: string): Promise<false | undefined>;
      enableApp(appId: string): Promise<false | undefined>;
      getLoginActivity(): Promise<LoginActivity[]>;
      logActivity(action: string): Promise<boolean>;
      elevate(id: string): Promise<unknown>;
      manuallyElevate(data: ElevationData): Promise<unknown>;
      loadElevation(id: string, data: ElevationData): void;
      changeUsername(newUsername: string): Promise<boolean>;
      changePassword(newPassword: string): Promise<boolean>;
      syncVirtualDesktops(v: UserPreferences): Promise<void>;
      renderVirtualDesktop(uuid: string): void;
      deleteVirtualDesktop(uuid: string): Promise<void>;
      startVirtualDesktops(): Promise<void>;
      getCurrentDesktop(): HTMLDivElement | undefined;
      createWorkspace(name?: string): void;
      getDesktopIndexByUuid(uuid: string): number;
      switchToDesktopByUuid(uuid: string): void;
      killWindowsOfDesktop(uuid: string): Promise<boolean | undefined>;
      nextDesktop(): boolean;
      previousDesktop(): void;
      moveWindow(pid: number, destination: string): Promise<void>;
      startDriveNotifierWatcher(): void;
      unmountMountedDrives(): Promise<void>;
      FileProgress(initialData: Partial<FsProgressOperation>, parentPid?: number): Promise<FileProgressMutator>;
      moveMultiple(sources: string[], destination: string, pid: number): Promise<void>;
      copyMultiple(sources: string[], destination: string, pid: number): Promise<void>;
      findHandlerToOpenFile(path: string): Promise<FileOpenerResult[]>;
      getAllFileHandlers(): Promise<FileOpenerResult[]>;
      getMimeIconByFilename(filename: string): string | undefined;
      getMimeIconByExtension(extension: string): string | undefined;
      loadMimeIcon(extension: string, icon: string): void;
      LoadSaveDialog(data: Omit<LoadSaveDialogData, "returnId">): Promise<string[] | [
          undefined
      ]>;
      openFile(path: string, shortcut?: ArcShortcut): Promise<any>;
      openWith(path: string): Promise<void>;
      handleShortcut(path: string, shortcut: ArcShortcut): Promise<any>;
      createShortcut(data: ArcShortcut, path: string): Promise<boolean>;
      getGlobalSetting(key: string): any;
      setGlobalSetting(key: string, value: any): void;
      checkReducedMotion(): void;
      IconPicker(data: Omit<IconPickerData, "returnId">): Promise<string | undefined>;
      installApp(data: InstalledApp): Promise<void>;
      deleteApp(id: string, deleteFiles?: boolean): Promise<false | undefined>;
      installAppFromPath(path: string): Promise<"failed to read file" | "failed to convert to JSON" | "missing properties" | undefined>;
      activateAdminBootstrapper(): Promise<void>;
      activateMessagingService(): void;
      startShareManager(): Promise<void>;
      startServiceHost(): Promise<void>;
      activateBugHuntUserSpaceProcess(): Promise<void>;
      GlobalLoadIndicator(caption?: string, pid?: number): Promise<{
          caption: ReadableStore<string>;
          stop: () => Promise<void>;
      }>;
      uninstallAppWithAck(app: App): Promise<boolean>;
      getPublicUserInfoOf(userId: string): Promise<PublicUserInfo | undefined>;
      getAppIcon(app: App, workingDirectory?: string): string;
      getAppIconByProcess(process: AppProcess): string;
      safeModeNotice(): void;
      iHaveFeedback(process: AppProcess): void;
      activateGlobalDispatch(): Promise<void>;
      changeShell(id: string): Promise<false | undefined>;
      Confirm(title: string, message: string, no: string, yes: string, image?: string): Promise<unknown>;
      enableThirdParty(): Promise<void>;
      disableThirdParty(): Promise<void>;
      pinApp(appId: string): Promise<void>;
      unpinApp(appId: string): void;
  }

  export const installArcPkg: (d: UserDaemon) => FileHandler;

  export const installTpaFile: (d: UserDaemon) => FileHandler;

  export const runTpaFile: (d: UserDaemon) => FileHandler;

  export const runTpaBundle: (d: UserDaemon) => FileHandler;

  export const BuiltinThemes: ThemeStore;

  export const VisualStyles: Record<string, string>;

  export const ActivityIconTranslations: {
      unknown: string;
      login: string;
      logout: string;
  };

  export const ActivityCaptionTranslations: {
      unknown: string;
      login: string;
      logout: string;
  };

  export const TimeFrames: Record<string, string>;

  export const DefaultMimeIcons: Record<string, string[]>;

  export function DefaultFileHandlers(daemon: UserDaemon): Record<string, FileHandler>;

  export const DefaultAppData: App;

  export const DefaultThirdPartyAppData: {
      metadata: {
          name: string;
          author: string;
          version: string;
          icon: string;
      };
      size: {
          w: number;
          h: number;
      };
      minSize: {
          w: number;
          h: number;
      };
      maxSize: {
          w: number;
          h: number;
      };
      position: {
          centered: boolean;
      };
      state: {
          maximized: boolean;
          minimized: boolean;
          resizable: boolean;
          headless: boolean;
          fullscreen: boolean;
      };
      controls: {
          minimize: boolean;
          maximize: boolean;
          close: boolean;
      };
      entrypoint: string;
      glass: boolean;
      id: string;
  };

  export const AppGroups: Record<string, string>;

  export const UserPaths: {
      Root: string;
      Home: string;
      Applications: string;
      Documents: string;
      Pictures: string;
      Downloads: string;
      Wallpapers: string;
      Desktop: string;
      Music: string;
  };

  export const UserPathCaptions: Record<string, string>;

  export const UserPathIcons: Record<string, string>;

  export const UserFonts: string[];

  export function isPopulatable(app: App): boolean;

  export function RegisteredProcess(process: RegisteredProcess): App;

  export class ArcFindRuntime extends AppProcess {
      private fileSystemIndex;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      Search(query: string): Promise<{
          id: string;
          item: SearchItem;
          refIndex: number;
          score?: number;
          matches?: ReadonlyArray<FuseResultMatch>;
      }[]>;
      getFilesystemSearchSupplier(preferences: UserPreferences): Promise<SearchItem[]>;
      getAppSearchSupplier(preferences: UserPreferences): Promise<SearchItem[]>;
      getFlatTree(): Promise<PathedFileEntry[]>;
  }

  export function ShellContextMenu(runtime: ShellRuntime): AppContextMenu;

  export const weatherMetadata: Record<number, WeatherMeta>;

  export const weatherClasses: Record<number, string>;

  export const QuickSettings: QuickSetting[];

  export class ShellRuntime extends AppProcess {
      startMenuOpened: ReadableStore<boolean>;
      actionCenterOpened: ReadableStore<boolean>;
      workspaceManagerOpened: ReadableStore<boolean>;
      stackBusy: ReadableStore<boolean>;
      searchQuery: ReadableStore<string>;
      searchResults: ReadableStore<FuseResult<SearchItem>[]>;
      searching: ReadableStore<boolean>;
      SelectionIndex: ReadableStore<number>;
      FullscreenCount: ReadableStore<Record<string, number>>;
      openedTrayPopup: ReadableStore<string>;
      trayHost?: TrayHostRuntime;
      arcFind?: ArcFindRuntime;
      ready: ReadableStore<boolean>;
      contextMenu: AppContextMenu;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      start(): Promise<void>;
      gotReadySignal(): Promise<void>;
      render(): Promise<void>;
      getWeather(): Promise<WeatherInformation>;
      pinApp(appId: string): Promise<void>;
      unpinApp(appId: string): void;
      deleteWorkspace(workspace: Workspace): Promise<void>;
      MutateIndex(e: KeyboardEvent): void | -1;
      Trigger(result: SearchItem): Promise<void>;
      Submit(): void;
      exit(): Promise<void>;
  }

  export class AppLoadError extends Error {
      name: string;
      constructor(message: string);
  }

  export class AppRuntimeError extends Error {
      name: string;
      constructor(message: string);
  }

  export class AppRendererError extends Error {
      name: string;
      constructor(message: string);
  }

  export const bannedKeys: string[];

  export class AppProcess extends Process {
      crashReason: string;
      windowTitle: ReadableStore<string>;
      windowIcon: ReadableStore<string>;
      app: AppProcessData;
      componentMount: Record<string, any>;
      userPreferences: ReadableStore<UserPreferences>;
      username: string;
      systemDispatch: SystemDispatch;
      userDaemon: UserDaemon | undefined;
      shell: ShellRuntime | undefined;
      overridePopulatable: boolean;
      safeMode: boolean;
      protected overlayStore: Record<string, App>;
      protected elevations: Record<string, ElevationData>;
      renderArgs: RenderArgs;
      acceleratorStore: AppKeyCombinations;
      readonly contextMenu: AppContextMenu;
      altMenu: ReadableStore<ContextMenuItem[]>;
      windowFullscreen: ReadableStore<boolean>;
      draggable: Draggable | undefined;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, ...args: any[]);
      onClose(): Promise<boolean>;
      closeWindow(kill?: boolean): Promise<void>;
      CrashDetection(): Promise<void>;
      render(args: RenderArgs): any;
      __render__(body: HTMLDivElement): Promise<void>;
      getSingleton(): AppProcess[];
      closeIfSecondInstance(): Promise<AppProcess | undefined>;
      getWindow(): HTMLDivElement;
      getBody(): HTMLDivElement;
      hasOverlays(): boolean;
      startAcceleratorListener(): void;
      stopAcceleratorListener(): void;
      __stop(): Promise<any>;
      private processor;
      unfocusActiveElement(): void;
      spawnOverlay(id: string, ...args: any[]): Promise<boolean>;
      spawnApp<T = AppProcess>(id: string, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      spawnOverlayApp<T = AppProcess>(id: string, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      elevate(id: string): Promise<unknown>;
      notImplemented(what?: string): void;
      appStore(): ApplicationStorage;
  }

  export class AppRenderer extends Process {
      currentState: number[];
      target: HTMLDivElement;
      maxZIndex: number;
      focusedPid: ReadableStore<number>;
      appStore: ReadableStore<Map<string, AppProcessData>>;
      defaultApps: AppStorage;
      _criticalProcess: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, target: string);
      disposedCheck(): void;
      render(process: AppProcess, renderTarget: HTMLDivElement | undefined): Promise<void>;
      _windowClasses(proc: AppProcess, window: HTMLDivElement, data: App): void;
      _windowEvents(proc: AppProcess, window: HTMLDivElement, titlebar: HTMLDivElement | undefined, data: App): void;
      focusPid(pid: number): void;
      _renderTitlebar(process: AppProcess): HTMLDivElement | undefined;
      _renderAltMenu(process: AppProcess): HTMLDivElement;
      _resizeGrabbers(process: AppProcess, window: HTMLDivElement): undefined;
      _resizer(window: HTMLDivElement, resizer: WindowResizer): HTMLDivElement;
      remove(pid: number): Promise<void>;
      toggleMaximize(pid: number): void;
      updateDraggableDisabledState(pid: number, window: HTMLDivElement): void;
      unMinimize(pid: number): void;
      unsnapWindow(pid: number, dispatch?: boolean): void;
      snapWindow(pid: number, variant: string): void;
      toggleMinimize(pid: number): void;
      toggleFullscreen(pid: number): void;
      getAppInstances(id: string, originPid?: number): AppProcess[];
      notifyCrash(data: App, e: Error, process: AppProcess): void;
  }

  export class ProcessHandler extends KernelModule {
      BUSY: boolean;
      private lastPid;
      store: ReadableStore<Map<number, Process>>;
      rendererPid: number;
      renderer: AppRenderer | undefined;
      env: Environment;
      dispatch: SystemDispatch;
      constructor(kernel: WaveKernel, id: string);
      _init(): Promise<void>;
      startRenderer(initPid: number): Promise<void>;
      private makeBusy;
      private makeNotBusy;
      spawn<T = Process>(process: typeof Process, renderTarget?: HTMLDivElement | undefined, parentPid?: number | undefined, ...args: any[]): Promise<T | undefined>;
      kill(pid: number, force?: boolean): Promise<ProcessKillResult>;
      _killSubProceses(pid: number, force?: boolean): Promise<void>;
      getSubProcesses(parentPid: number): Map<number, Process>;
      getProcess<T = Process>(pid: number, disposedToo?: boolean): T | undefined;
      getPid(): number;
      isPid(pid: number): boolean;
      ConnectDispatch(pid: number): ProcessDispatch | undefined;
      waitForAvailable(): Promise<void>;
  }

  export const defaultReportOptions: ReportOptions;

  export class BugHunt extends KernelModule {
      server: ServerManager;
      env: Environment;
      handler: ProcessHandler;
      constructor(kernel: WaveKernel, id: string);
      _init(): Promise<void>;
      createReport(options?: ReportOptions): OutgoingBugReport;
      sendReport(outgoing: OutgoingBugReport, token?: string, options?: ReportOptions): Promise<boolean>;
      getToken(): string;
      getUserBugReports(token: string): Promise<BugReport[]>;
      getPublicBugReports(): Promise<BugReport[]>;
  }

  export function Crash(reason: ErrorEvent | PromiseRejectionEvent): void;

  export function handleGlobalErrors(): void;

  export interface State {
      render?: (props: Record<string, any>, accessors: StateRendererAccessors) => Promise<any>;
      app?: App;
      html?: string;
      name: string;
      identifier: string;
  }

  export interface StateRendererAccessors {
      state: StateHandler;
      kernel: WaveKernel;
      stack: ProcessHandler;
  }

  export type StateProps = Record<string, any>;

  export class StateError extends Error {
      name: string;
      constructor(message: string);
  }

  export class BootScreenRuntime extends AppProcess {
      progress: ReadableStore<boolean>;
      status: ReadableStore<string>;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      begin(): Promise<void>;
      startBooting(e?: KeyboardEvent): Promise<void>;
  }

  export const BootScreen: App;

  export interface PageButton {
      to?: number;
      action?: () => Promise<void>;
      caption: string;
      suggested?: boolean;
      disabled?: () => boolean | Promise<boolean>;
  }

  export interface PageButtonPage {
      left?: PageButton;
      previous: PageButton;
      next: PageButton;
  }

  export type PageButtons = PageButtonPage[];

  export class InitialSetupRuntime extends AppProcess {
      pageNumber: ReadableStore<number>;
      identityInfoValid: ReadableStore<boolean>;
      newUsername: ReadableStore<string>;
      password: ReadableStore<string>;
      confirm: ReadableStore<string>;
      email: ReadableStore<string>;
      actionsDisabled: ReadableStore<boolean>;
      showMainContent: ReadableStore<boolean>;
      fullName: ReadableStore<string>;
      server: ServerManager;
      private token;
      readonly pages: LegacyComponentType[];
      readonly pageButtons: PageButtons;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData);
      render(): Promise<void>;
      licenseConfirmation(): Promise<void>;
      viewLicense(): Promise<void>;
      createAccount(): Promise<void>;
      checkAccountActivation(): Promise<void>;
      finish(): Promise<void>;
  }

  export const InitialSetupWizard: App;

  export const ProfilePictures: {
      [key: string]: string;
  };

  export interface LoginAppProps {
      userDaemon?: UserDaemon;
      type?: string;
      safeMode?: boolean;
  }

  export interface PersistenceInfo {
      username: string;
      profilePicture: string;
      loginWallpaper?: string;
  }

  export class LoginAppRuntime extends AppProcess {
      DEFAULT_WALLPAPER: ReadableStore<string>;
      loadingStatus: ReadableStore<string>;
      errorMessage: ReadableStore<string>;
      profileImage: ReadableStore<string>;
      profileName: ReadableStore<string>;
      loginBackground: ReadableStore<string>;
      hideProfileImage: ReadableStore<boolean>;
      persistence: ReadableStore<PersistenceInfo | undefined>;
      serverInfo: ServerInfo | undefined;
      unexpectedInvocation: boolean;
      safeMode: boolean;
      private type;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, props?: LoginAppProps);
      render(): Promise<void>;
      proceed(username: string, password: string): Promise<void>;
      startDaemon(token: string, username: string, info?: UserInfo): Promise<void>;
      logoff(daemon: UserDaemon): Promise<void>;
      shutdown(daemon?: UserDaemon): Promise<void>;
      restart(daemon?: UserDaemon): Promise<void>;
      private saveToken;
      private loadToken;
      private validateUserToken;
      resetCookies(): void;
      private askForTotp;
      loadPersistence(): void;
      savePersistence(username: string, profilePicture: string, loginWallpaper?: string): void;
      deletePersistence(): void;
  }

  export const LoginApp: App;

  export default function TurnedOff(): Promise<void>;

  export default function render(props: StateProps): Promise<void>;

  export default function render(props: StateProps): Promise<void>;

  export class TerminalMode extends Process {
      userDaemon?: UserDaemon;
      target: HTMLDivElement;
      term?: Terminal;
      rl?: Readline;
      arcTerm?: ArcTerminal;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, target: HTMLDivElement);
      initializeTerminal(): Promise<void>;
      proceed(username: string, password: string): Promise<false | void>;
      start(): Promise<boolean | undefined>;
      startDaemon(token: string, username: string, info?: UserInfo): Promise<void>;
      private loadToken;
      private validateUserToken;
      resetCookies(): void;
      loginPrompt(): Promise<boolean>;
      private saveToken;
      askForTotp(token: string): Promise<boolean>;
  }

  export default function render(_: StateProps, { stack, kernel }: StateRendererAccessors): Promise<void>;

  export default function render(props: StateProps): Promise<void>;

  export default function render(): Promise<void>;

  export const States: Record<string, State>;

  export class StateHandler extends Process {
      store: Record<string, State>;
      currentState: string;
      stateProps: Record<string, Record<any, any>>;
      stateAppProcess: AppProcess | undefined;
      _criticalProcess: boolean;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, instanceName: string, store?: Record<string, State>);
      loadState(id: string, props?: Record<string, any>, instant?: boolean): Promise<void>;
      loadStateNormally(id: string, data: State, htmlLoader: HTMLDivElement, cssLoader: HTMLLinkElement): Promise<void>;
      loadStateAsApp(data: State, props: Record<string, any>): Promise<void>;
      getStateLoaders(): {
          htmlLoader: HTMLDivElement;
          cssLoader: HTMLLinkElement;
          main: HTMLDivElement;
      };
      protected stop(): Promise<any>;
  }

  export class MemoryFilesystemDrive extends FilesystemDrive {
      private readonly data;
      FIXED: boolean;
      IDENTIFIES_AS: string;
      FILESYSTEM_LONG: string;
      FILESYSTEM_SHORT: string;
      HIDDEN: boolean;
      label: string;
      constructor(kernel: any, uuid: string, letter?: string);
      private getPathParts;
      private getEntry;
      private setEntry;
      private deleteEntry;
      readDir(path: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(path: string): Promise<boolean>;
      readFile(path: string): Promise<ArrayBuffer | undefined>;
      writeFile(path: string, data: Blob): Promise<boolean>;
      tree(path: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(path: string): Promise<boolean>;
      direct(path: string): Promise<string | undefined>;
      quota(): Promise<UserQuota>;
  }

  export class InitProcess extends Process {
      constructor(handler: ProcessHandler, pid: number, parentPid?: undefined);
      stop(): Promise<void>;
      jumpstart(): Promise<void>;
      initializeTempFs(): Promise<void>;
  }

  export class ASTNode {
      type: string;
      value: any;
      children: (ASTNode | null)[];
      key: string;
      constructor(type: string, value?: null, children?: (ASTNode | null)[]);
  }

  export class LangError extends Error {
      line: number | null;
      column: number | null;
      input: string;
      constructor(message: string, line?: number | null, column?: number | null, input?: string);
      toString(): string;
  }

  export class Token {
      type: TokenType;
      value: any;
      constructor(type: TokenType, value: any);
  }

  export class Lexer {
      input: string;
      position: number;
      line: number;
      column: number;
      currentChar: string | null;
      constructor(input: string);
      advance(): void;
      skipWhitespace(): void;
      skipComment(): void;
      getNumber(): Token;
      getString(): Token | undefined;
      getIdentifier(): string;
      getNextToken(): Token | undefined;
      error(message: string): void;
  }

  export class Parser {
      lexer: Lexer;
      currentToken: Token | undefined;
      constructor(lexer: Lexer);
      eat(tokenType: string): void;
      parse(): ASTNode;
      program(): ASTNode;
      declaration(): ASTNode;
      statement(): ASTNode;
      functionDeclaration(): ASTNode;
      returnStatement(): ASTNode;
      ifStatement(): ASTNode;
      whileStatement(): ASTNode;
      forStatement(): ASTNode;
      blockStatement(): ASTNode;
      assignmentStatement(): ASTNode | undefined;
      expressionStatement(): ASTNode;
      expression(): ASTNode;
      logicalOr(): ASTNode;
      logicalAnd(): ASTNode;
      equality(): ASTNode;
      relational(): ASTNode;
      additive(): ASTNode;
      multiplicative(): ASTNode;
      unary(): any;
      primary(): any;
      objectLiteral(): ASTNode;
      arrayLiteral(): ASTNode;
      error(message: string): void;
  }

  export const DefaultArcLangOptions: ArcLangOptions;

  export class Interpreter extends Process {
      ast: ASTNode | undefined;
      globalEnvironment: Record<string, any>;
      currentEnvironment: Record<string, any>;
      callStack: Record<string, any>[];
      onError: LangErrorCallback;
      stdout: LangStdoutCallback;
      stdin: LangStdinCallback;
      onExit: LangExitCallback;
      allowUnsafe: boolean;
      arguments: any[];
      workingDir: string;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, options?: ArcLangOptions);
      protected stop(): Promise<any>;
      interpret(ast?: ASTNode | undefined): Promise<any>;
      visit(node: ASTNode): Promise<any>;
      visitProgram(node: ASTNode): Promise<any>;
      visitExpressionStatement(node: ASTNode): Promise<any>;
      visitAssignment(node: ASTNode): Promise<any>;
      visitIfStatement(node: ASTNode): Promise<any>;
      visitWhileStatement(node: ASTNode): Promise<any>;
      visitForStatement(node: ASTNode): Promise<null>;
      visitBlockStatement(node: ASTNode): Promise<any>;
      visitFunctionDeclaration(node: ASTNode): Promise<{
          parameters: any[] | undefined;
          body: ASTNode | null;
      }>;
      visitFunctionCall(node: ASTNode): Promise<any>;
      visitReturnStatement(node: ASTNode): Promise<any>;
      visitArrayLiteral(node: ASTNode): Promise<Promise<any>[]>;
      visitArrayAccess(node: ASTNode): Promise<any>;
      visitObjectLiteral(node: ASTNode): Promise<Record<string, ASTNode>>;
      visitPropertyAccess(node: ASTNode): Promise<any>;
      visitIdentifier(node: ASTNode): Promise<any>;
      visitBinaryOperator(node: ASTNode): Promise<any>;
      error(message: string): void;
      run(code: string): Promise<any>;
  }

  export interface NativeFunction {
      parameters: string[];
      body: ASTNode | ((...args: any[]) => any);
      native?: boolean;
  }

  export type TokenType = "PLUS" | "MINUS" | "MULTIPLY" | "DIVIDE" | "MODULO" | "LPAREN" | "RPAREN" | "LBRACE" | "RBRACE" | "LBRACKET" | "RBRACKET" | "SEMICOLON" | "COMMA" | "COLON" | "DOT" | "EQUAL_EQUAL" | "ASSIGN" | "NOT_EQUAL" | "NOT" | "GREATER_EQUAL" | "GREATER" | "LESS_EQUAL" | "LESS" | "AND" | "OR" | "EOF" | "STRING" | "BOOLEAN" | "IDENTIFIER" | "NULL" | "FLOAT" | "INTEGER" | "FUN" | "IF" | "WHILE" | "FOR" | "RETURN" | "ELSE";

  export type LangErrorCallback = (error: LangError) => void;

  export type LangStdoutCallback = (...args: any[]) => void;

  export type LangStdinCallback = () => Promise<string>;

  export type LangExitCallback = (interpreter: Interpreter) => void;

  export type GlobalEnvironmentCallback = (interpreter: Interpreter) => Record<string, any>;

  export interface ArcLangOptions {
      onError?: LangErrorCallback;
      stdout?: LangStdoutCallback;
      stdin?: LangStdinCallback;
      onExit?: LangExitCallback;
      allowUnsafe?: boolean;
      globalEnvironment?: GlobalEnvironmentCallback;
      arguments?: any[];
      workingDir?: string;
      ast?: ASTNode;
  }

  export class ArcLang extends KernelModule {
      stack: ProcessHandler;
      locked: boolean;
      constructor(kernel: WaveKernel, id: string);
      run(code: string, parentPid: number, options?: ArcLangOptions): Promise<unknown>;
  }

  export const clear: Keyword;

  export const echo: Keyword;

  export const exit: Keyword;

  export const idle: Keyword;

  export const If: Keyword;

  export const input: Keyword;

  export const jump: Keyword;

  export const mount: Keyword;

  export const MsgBox: Keyword;

  export const Return: Keyword;

  export const sleep: Keyword;

  export const umount: Keyword;

  export const exec: Keyword;

  export const keyword: Keyword;

  export const BaseLibrary: Library;

  export const Atob: Keyword;

  export const Btoa: Keyword;

  export const Base64Library: Library;

  export const abtostr: Keyword;

  export const dataurl: Keyword;

  export const ConvertLibrary: Library;

  export const calc: Keyword;

  export const chr: Keyword;

  export const length: Keyword;

  export const push: Keyword;

  export const DataLibrary: Library;

  export const get: Keyword;

  export const set: Keyword;

  export const EnvLibrary: Library;

  export const action: Keyword;

  export class ScriptedAppProcess extends AppProcess {
      private lang;
      bodyStore: ReadableStore<HTMLDivElement>;
      body: HTMLDivElement | undefined;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, app: AppProcessData, lang: LanguageInstance);
      __render__(): Promise<void>;
      protected stop(): Promise<void>;
  }

  export const create: Keyword;

  export const append: Keyword;

  export const button: Keyword;

  export const create: Keyword;

  export const div: Keyword;

  export const ElementGet: Keyword;

  export const h1: Keyword;

  export const GuiLibrary: Library;

  export const get: Keyword;

  export const jload: Keyword;

  export const parse: Keyword;

  export const JsonLibrary: Library;

  export const cat: Keyword;

  export const css: Keyword;

  export const html: Keyword;

  export const Img: Keyword;

  export const Import: Keyword;

  export const _unsafe: Keyword;

  export const SourceLibrary: Library;

  export const BaseLibraries: Libraries;

  export const DefaultLanguageOptions: LanguageOptions;

  export class LanguageInstance extends Process {
      output: string[];
      variables: Map<string, any>;
      pointer: number;
      oldPointer: number;
      source: InterpreterCommand[];
      tokens: any[];
      stdin: () => Promise<string>;
      stdout: (m: string) => void;
      onTick: (l: LanguageInstance) => void;
      onError: (error: LanguageExecutionError) => void;
      onExit: (l: LanguageInstance) => void;
      private consumed;
      private MAX_EXECUTION_CAP;
      libraries: Libraries;
      executionCount: number;
      workingDir: string;
      options: LanguageOptions;
      fs: Filesystem;
      private exception;
      app: AppProcessData | undefined;
      appProcess: AppProcess | undefined;
      userDaemon: UserDaemon | undefined;
      constructor(handler: ProcessHandler, pid: number, parentPid: number, source: string, options?: LanguageOptions, libraries?: Libraries);
      stop(): Promise<void>;
      private parseSource;
      watchException(): Promise<void>;
      error(reason: string, keyword?: string): LanguageExecutionError;
      run(): Promise<string[]>;
      interpret(): Promise<void>;
      normalizeTokens(tokens: any[]): any[] | undefined;
      tokenise(code: string): string[];
      reset(): Promise<void>;
      defaultVariables(): Promise<Map<string, any>>;
      expectTokenLength(length: number, where: string): boolean;
      calculate(left: string, operator: string, right: string): string | number | boolean | undefined;
      jump(codepoint: string): void;
      readDir(relativePath: string): Promise<DirectoryReadReturn | undefined>;
      createDirectory(relativePath: string): Promise<boolean>;
      readFile(relativePath: string): Promise<ArrayBuffer | undefined>;
      writeFile(relativePath: string, data: Blob): Promise<boolean>;
      tree(relativePath: string): Promise<RecursiveDirectoryReadReturn | undefined>;
      copyItem(source: string, destination: string): Promise<boolean>;
      moveItem(source: string, destination: string): Promise<boolean>;
      deleteItem(relativePath: string): Promise<boolean>;
  }

  export class LanguageExecutionError extends Error {
      pointer: number;
      executionCount: number;
      keyword: string;
      message: string;
      tokens: string[];
      instruction: InterpreterCommand;
      constructor(message: string, lang: LanguageInstance, keyword?: string);
      getObject(): {
          pointer: number;
          executionCount: number;
          keyword: string;
          message: string;
          tokens: string[];
          instruction: InterpreterCommand;
      };
  }

  export class PrematureLanguageError extends Error {
      message: string;
      constructor(message: string);
  }

  export type StdIn = (p?: string) => Promise<string>;

  export type StdOut = (m: string) => void;

  export type Keyword = (lang: LanguageInstance) => Promise<any>;

  export type Library = Record<string, Keyword | Record<string, Keyword>>;

  export type Libraries = Record<string, Library>;

  export interface LanguageOptions {
      stdin?: () => Promise<string>;
      stdout?: (m: string) => void;
      onTick?: (l: LanguageInstance) => void;
      onError?: (error: LanguageExecutionError) => void;
      onExit?: (l: LanguageInstance) => void;
      allowUnsafe?: boolean;
      continuous?: boolean;
      tickDelay?: number;
      workingDir?: string;
      arguments?: any[];
  }

  export interface InterpreterCommand {
      line: number;
      column: number;
      command: string;
  }

  export class ArcMSL extends KernelModule {
      private stack;
      private locked;
      constructor(kernel: WaveKernel, id: string);
      _init(): Promise<void>;
      run(source: string, parent: number, options?: LanguageOptions): Promise<string[] | undefined>;
  }

  export const KernelModules: Record<string, any>;

  export function prematurePanic(): void;

  export class WaveKernel {
      private modules;
      private PANICKED;
      Logs: ReadableStore<LogItem[]>;
      startMs: number;
      init: InitProcess | undefined;
      state: StateHandler | undefined;
      initPid: number;
      params: URLSearchParams;
      ARCOS_MODE: string;
      ARCOS_BUILD: string;
      ARCOS_LICENSE: string;
      BUGREP_TITLE: string;
      static get(): WaveKernel;
      static isPanicked(): boolean;
      constructor();
      static panic(reason: string): Promise<void>;
      _init(): Promise<void>;
      getModule<T = any>(id: string, dontCrash?: boolean): T;
      private _kernelModules;
      Log(source: string, message: string, level?: LogLevel): void;
  }

  export function stringifyLogs(logs: LogItem[]): string;

  export function getReportIcon(report: BugReport): string;

  export const ICON_GROUP_CAPTIONS: {
      Branding: string;
      General: string;
      Apps: string;
      Filesystem: string;
      Power: string;
      Dialog: string;
      Status: string;
      Mimetypes: string;
  };

  export const ElevationLevelIcons: Record<ElevationLevel, string>;

  export const DriveIcons: Record<string, string>;

  export const FilterLevels: FilterLevel[];

  export const FilterIcons: Map<"all" | LogLevel, string>;

  export const LogItemIcons: Record<LogLevel, string>;

  export function toBase64(input: string): string;

  export function fromBase64(input: string): string;

  export const RelativeTimeMod: {
      relativeTime: {
          future: string;
          past: string;
          s: string;
          m: string;
          mm: string;
          h: string;
          hh: string;
          d: string;
          dd: string;
          M: string;
          MM: string;
          y: string;
          yy: string;
      };
  };

  export function groupByTimeFrame<T extends Record<string, any>>(items: T[], column?: keyof T): Record<string, T[]>;

  export const MODES: Record<string, string>;

  export const Logo: (m?: string) => string;

  export const set: Keyword;

  export function scopeToScopeCaption(scope: string): string;

  export interface WeatherSearchResult {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
      elevation: number;
      feature_code: string;
      country_code: string;
      admin1_id: number;
      admin2_id: number;
      timezone: string;
      postcodes: string[];
      country_id: number;
      country: string;
      admin1: string;
      admin2: string;
  }

  export interface WeatherSearchResponse {
      results: WeatherSearchResult[];
      generationtime_ms: number;
  }

  export const kernel: WaveKernel;

  export const daemon: UserDaemon;

  export const handler: ProcessHandler;

  export const fs: Filesystem;

  export const env: Environment;

  export const serviceHost: ServiceHost | undefined;

  export const dispatch: SystemDispatch;

  export const icons: Record<string, string>;

  export const util: {
      htmlspecialchars: typeof htmlspecialchars;
      Plural: typeof Plural;
      sliceIntoChunks: typeof sliceIntoChunks;
      decimalToHex: typeof decimalToHex;
      sha256: typeof sha256;
      CountInstances: typeof CountInstances;
      join: typeof join;
      getItemNameFromPath: typeof getItemNameFromPath;
      getParentDirectory: typeof getParentDirectory;
      getDriveLetter: typeof getDriveLetter;
      formatBytes: typeof formatBytes;
      DownloadFile: typeof DownloadFile;
      onFileChange: typeof onFileChange;
      onFolderChange: typeof onFolderChange;
  };

  export const convert: {
      arrayToText: typeof arrayToText;
      textToArrayBuffer: typeof textToArrayBuffer;
      blobToText: typeof blobToText;
      textToBlob: typeof textToBlob;
      arrayToBlob: typeof arrayToBlob;
      blobToDataURL: typeof blobToDataURL;
  };

  export const workingDirectory: string;

  export const argv: any[];

  export const app: App;

  export const $ENTRYPOINT: string;

  export const $METADATA: string;

  export const load: (path: string) => Promise<any>;

  export const runApp: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<ThirdPartyAppProcess | undefined>;

  export const runAppDirect: (process: typeof ThirdPartyAppProcess, metadataPath: string, parentPid?: number, ...args: any[]) => Promise<ThirdPartyAppProcess | undefined>;

  export const loadHtml: (path: string) => Promise<string | undefined>;

  export const loadDirect: (path: string) => Promise<string | undefined>;

  export const Server: AxiosInstance;

  export const Debug: (m: any) => void;

  export const dayjs: (s: string) => dayjs.Dayjs;
}

export {};