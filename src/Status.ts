/**
 * This is the object stored by the Obsidian configuration and used to create the status
 * objects for the session
 *
 * @export
 * @class StatusConfiguration
 */
export class StatusConfiguration {
    /**
     * The indicator used between the two square brackets in the markdown task.
     *
     * @type {string}
     * @memberof Status
     */
    public readonly indicator: string;

    /**
     * Returns the name of the status for display purposes.
     *
     * @type {string}
     * @memberof Status
     */
    public readonly name: string;

    /**
     * Returns the next status for a task when toggled.
     *
     * @type {string}
     * @memberof Status
     */
    public readonly nextStatusIndicator: string;

    /**
     * If true then it is registered as a command that the user can map to.
     *
     * @type {boolean}
     * @memberof Status
     */
    public readonly availableAsCommand: boolean;

    /**
     * Creates an instance of Status. The registry will be added later in the case
     * of the default statuses.
     *
     * @param {string} indicator
     * @param {string} name
     * @param {Status} nextStatusIndicator
     * @param {bool} availableAsCommand
     * @memberof Status
     */
    constructor(indicator: string, name: string, nextStatusIndicator: string, availableAsCommand: boolean) {
        this.indicator = indicator;
        this.name = name;
        this.nextStatusIndicator = nextStatusIndicator;
        this.availableAsCommand = availableAsCommand;
    }
}

/**
 * Tracks the possible states that a task can be in.
 *
 * @export
 * @class Status
 */
export class Status {
    /**
     * The default Done status. Goes to Todo when toggled.
     *
     * @static
     * @type {Status}
     * @memberof Status
     */
    public static DONE: Status = new Status(new StatusConfiguration('x', 'Done', ' ', true));

    /**
     * A default status of empty, used when things go wrong.
     *
     * CFM Why is this available as a command?
     *
     * @static
     * @memberof Status
     */
    public static EMPTY: Status = new Status(new StatusConfiguration('', 'EMPTY', '', true));

    /**
     * The default Todo status. Goes to In Progress when toggled.
     *
     * CFM What if users don't want this - and want to be able to cycle between Todo and Done?
     *
     * @static
     * @type {Status}
     * @memberof Status
     */
    public static TODO: Status = new Status(new StatusConfiguration(' ', 'Todo', '/', true));

    /**
     * The default Cancelled status. Goes to Todo when toggled.
     *
     * @static
     * @type {Status}
     * @memberof Status
     */
    public static CANCELLED: Status = new Status(new StatusConfiguration('-', 'Cancelled', ' ', true));

    /**
     * The default In Progress status. Goes to Done when toggled.
     *
     * CFM What if users want to be able to use a different character for 'In Progress'?
     *
     * @static
     * @type {Status}
     * @memberof Status
     */
    public static IN_PROGRESS: Status = new Status(new StatusConfiguration('/', 'In Progress', 'x', true));

    /**
     * The configuration stored in the data.json file. A {@link StatusConfiguration}
     *
     * @type {StatusConfiguration}
     * @memberof Status
     */
    private readonly configuration: StatusConfiguration;

    /**
     * The indicator used between the two square brackets in the markdown task.
     *
     * @type {string}
     * @memberof Status
     */
    public get indicator(): string {
        return this.configuration.indicator;
    }

    /**
     * Returns the name of the status for display purposes.
     *
     * @type {string}
     * @memberof Status
     */
    public get name(): string {
        return this.configuration.name;
    }

    /**
     * Returns the next status for a task when toggled.
     *
     * @type {string}
     * @memberof Status
     */
    public get nextStatusIndicator(): string {
        return this.configuration.nextStatusIndicator;
    }

    /**
     * If true then it is registered as a command that the user can map to.
     *
     * @type {boolean}
     * @memberof Status
     */
    public get availableAsCommand(): boolean {
        return this.configuration.availableAsCommand;
    }

    /**
     * Creates an instance of Status. The registry will be added later in the case
     * of the default statuses.
     *
     * @param {StatusConfiguration} configuration
     * @memberof Status
     */
    constructor(configuration: StatusConfiguration) {
        this.configuration = configuration;
    }

    /**
     * Returns the completion status for a task, this is only supported
     * when the task is done/x.
     *
     * CFM Completed is an interesting concept. What if users want to treat other indicators as completed too?
     *
     * @return {*}  {boolean}
     * @memberof Status
     */
    public isCompleted(): boolean {
        return this.indicator === 'x' || this.indicator === 'X';
    }
}
