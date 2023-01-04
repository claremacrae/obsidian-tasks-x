import type { StatusConfiguration } from '../Status';
import { LogOptions, log } from './../lib/logging';
import { Feature, FeatureFlag } from './Feature';

interface SettingsMap {
    [key: string]: string | boolean;
}

export type HeadingState = {
    [id: string]: boolean;
};

export interface Settings {
    // Original settings, they will be auto migrated to the new settings map.
    globalFilter: string;
    removeGlobalFilter: boolean;
    setDoneDate: boolean;

    // The custom status states.
    status_types: Array<[string, string, string]>;
    statusTypes: StatusConfiguration[];

    // Collection of feature flag IDs and their state.
    features: FeatureFlag;

    // Settings are moved to a more general map to allow the settings UI to be
    // dynamically generated.
    generalSettings: SettingsMap;

    // Tracks the stage of the headings in the settings UI.
    headingOpened: HeadingState;

    loggingOptions: LogOptions;
}

const defaultSettings: Settings = {
    globalFilter: '',
    removeGlobalFilter: false,
    setDoneDate: true,
    status_types: [['', '', '']],
    statusTypes: [],
    features: Feature.settingsFlags,
    generalSettings: {
        globalFilter: '',
        removeGlobalFilter: false,
        setDoneDate: true,

        // Allows the filter to be pushed to the end of the tag. Available if APPEND_GLOBAL_FILTER feature enabled.
        appendGlobalFilter: false,

        defaultRenderTemplate: '',
    },
    headingOpened: {}, //;  { 'Documentation and Support': true },
    loggingOptions: {
        minLevels: {
            '': 'info',
            taskssql: 'info',
            'taskssql.perf': 'info',
            'taskssql.QuerySql.QuerySql': 'info',
        },
    },
};

let settings: Settings = { ...defaultSettings };

export const getSettings = (): Settings => {
    // Check to see if there is a new flag and if so add it to the users settings.
    for (const flag in Feature.settingsFlags) {
        if (settings.features[flag] === undefined) {
            settings.features[flag] = Feature.settingsFlags[flag];
        }
    }

    settings.generalSettings['globalFilter'] = settings.globalFilter;
    settings.generalSettings['removeGlobalFilter'] = settings.removeGlobalFilter;
    settings.generalSettings['setDoneDate'] = settings.setDoneDate;

    return { ...settings };
};

export const updateSettings = (newSettings: Partial<Settings>): Settings => {
    log('debug', `updateSettings ${JSON.stringify(newSettings)}`);

    settings = { ...settings, ...newSettings };

    return getSettings();
};

export const updateGeneralSetting = (name: string, value: string | boolean): Settings => {
    settings.generalSettings[name] = value;

    // sync the old settings for the moment so a larger change is not needed.
    updateSettings({
        globalFilter: <string>settings.generalSettings['globalFilter'],
        removeGlobalFilter: <boolean>settings.generalSettings['removeGlobalFilter'],
        setDoneDate: <boolean>settings.generalSettings['setDoneDate'],
    });

    return getSettings();
};

export const updateStatusSetting = (
    status_type: [string, string, string],
    valueIndex: number,
    newValue: string,
): Settings => {
    log('debug', `updateStatusSetting ${JSON.stringify(status_type)}, ${valueIndex}, ${newValue}`);

    const index = settings.status_types.findIndex((element) => {
        return element[0] === status_type[0] && element[1] === status_type[1] && element[2] === status_type[2];
    });

    log('debug', `updateStatusSetting ${index}`);

    if (index > -1) {
        settings.status_types[index][valueIndex] = newValue;
    }

    return getSettings();
};

export const getGeneralSetting = (name: string): string | boolean => {
    return settings.generalSettings[name];
};

export const isFeatureEnabled = (internalName: string): boolean => {
    return settings.features[internalName] ?? false;
};

export const toggleFeature = (internalName: string, enabled: boolean): FeatureFlag => {
    settings.features[internalName] = enabled;
    return settings.features;
};
