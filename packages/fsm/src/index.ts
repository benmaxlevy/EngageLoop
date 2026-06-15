export const GoalState = {
  QUEUED: 'QUEUED',
  CREATING_TASKS: 'CREATING_TASKS',
  AWAITING_APPROVAL: 'AWAITING_APPROVAL',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  FAILED: 'FAILED',
} as const;

export type GoalState = typeof GoalState[keyof typeof GoalState];

export const GoalEvent = {
  INITIALIZE: 'initialize',
  TASKS_READY: 'tasks ready',
  REQUEST_REVISION: 'request revision',
  APPROVE: 'approve',
  SUCCESS: 'success',
  UNRECOVERABLE: 'unrecoverable',
  CANCEL: 'cancel',
} as const;

export type GoalEvent = typeof GoalEvent[keyof typeof GoalEvent];

export const GOAL_STATE_DISPLAY: Record<GoalState, string> = {
  [GoalState.QUEUED]: 'Queued',
  [GoalState.CREATING_TASKS]: 'Creating Tasks',
  [GoalState.AWAITING_APPROVAL]: 'Awaiting Approval',
  [GoalState.IN_PROGRESS]: 'In Progress',
  [GoalState.COMPLETED]: 'Completed',
  [GoalState.CANCELED]: 'Canceled',
  [GoalState.FAILED]: 'Failed',
};

export const GOAL_TRANSITIONS: Record<GoalState, Partial<Record<GoalEvent, GoalState>>> = {
  [GoalState.QUEUED]: {
    [GoalEvent.INITIALIZE]: GoalState.CREATING_TASKS,
    [GoalEvent.CANCEL]: GoalState.CANCELED,
  },
  [GoalState.CREATING_TASKS]: {
    [GoalEvent.TASKS_READY]: GoalState.AWAITING_APPROVAL,
    [GoalEvent.CANCEL]: GoalState.CANCELED,
  },
  [GoalState.AWAITING_APPROVAL]: {
    [GoalEvent.REQUEST_REVISION]: GoalState.CREATING_TASKS,
    [GoalEvent.APPROVE]: GoalState.IN_PROGRESS,
    [GoalEvent.CANCEL]: GoalState.CANCELED,
  },
  [GoalState.IN_PROGRESS]: {
    [GoalEvent.SUCCESS]: GoalState.COMPLETED,
    [GoalEvent.UNRECOVERABLE]: GoalState.FAILED,
    [GoalEvent.CANCEL]: GoalState.CANCELED,
  },
  [GoalState.COMPLETED]: {
    [GoalEvent.CANCEL]: GoalState.CANCELED,
  },
  [GoalState.FAILED]: {
    [GoalEvent.CANCEL]: GoalState.CANCELED,
  },
  [GoalState.CANCELED]: {},
};

export const TaskState = {
  BLOCKED: 'BLOCKED',
  QUEUED: 'QUEUED',
  IN_PROGRESS: 'IN_PROGRESS',
  READY_FOR_REVIEW: 'READY_FOR_REVIEW',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  FAILED: 'FAILED',
} as const;

export type TaskState = typeof TaskState[keyof typeof TaskState];

export const TaskEvent = {
  DEPENDENCIES_RESOLVED: 'dependencies resolved',
  PROCESS: 'process',
  SUBMIT: 'submit',
  ERROR: 'error',
  BYPASS_REVIEW: 'bypass review',
  APPROVE: 'approve',
  REJECT_REVISE: 'reject / revise',
  CANCEL: 'cancel',
} as const;

export type TaskEvent = typeof TaskEvent[keyof typeof TaskEvent];

export const TASK_STATE_DISPLAY: Record<TaskState, string> = {
  [TaskState.BLOCKED]: 'Blocked',
  [TaskState.QUEUED]: 'Queued',
  [TaskState.IN_PROGRESS]: 'In Progress',
  [TaskState.READY_FOR_REVIEW]: 'Ready for Review',
  [TaskState.COMPLETED]: 'Completed',
  [TaskState.CANCELED]: 'Canceled',
  [TaskState.FAILED]: 'Failed',
};

export const TASK_TRANSITIONS: Record<TaskState, Partial<Record<TaskEvent, TaskState>>> = {
  [TaskState.BLOCKED]: {
    [TaskEvent.DEPENDENCIES_RESOLVED]: TaskState.QUEUED,
    [TaskEvent.CANCEL]: TaskState.CANCELED,
  },
  [TaskState.QUEUED]: {
    [TaskEvent.PROCESS]: TaskState.IN_PROGRESS,
    [TaskEvent.CANCEL]: TaskState.CANCELED,
  },
  [TaskState.IN_PROGRESS]: {
    [TaskEvent.SUBMIT]: TaskState.READY_FOR_REVIEW,
    [TaskEvent.ERROR]: TaskState.FAILED,
    [TaskEvent.BYPASS_REVIEW]: TaskState.COMPLETED,
    [TaskEvent.CANCEL]: TaskState.CANCELED,
  },
  [TaskState.READY_FOR_REVIEW]: {
    [TaskEvent.APPROVE]: TaskState.COMPLETED,
    [TaskEvent.REJECT_REVISE]: TaskState.IN_PROGRESS,
    [TaskEvent.CANCEL]: TaskState.CANCELED,
  },
  [TaskState.COMPLETED]: {
    [TaskEvent.CANCEL]: TaskState.CANCELED,
  },
  [TaskState.FAILED]: {
    [TaskEvent.CANCEL]: TaskState.CANCELED,
  },
  [TaskState.CANCELED]: {},
};

export type TransitionResult<S> =
  | { success: true; nextState: S }
  | { success: false; error: string };

export function transitionGoal(currentState: GoalState, event: GoalEvent): TransitionResult<GoalState> {
  const possibleTransitions = GOAL_TRANSITIONS[currentState];
  if (!possibleTransitions) {
    return { success: false, error: `Invalid current goal state: "${currentState}"` };
  }

  const nextState = possibleTransitions[event];
  if (!nextState) {
    return {
      success: false,
      error: `Cannot transition goal from state "${GOAL_STATE_DISPLAY[currentState]}" using event "${event}"`,
    };
  }

  return { success: true, nextState };
}

export function transitionTask(currentState: TaskState, event: TaskEvent): TransitionResult<TaskState> {
  const possibleTransitions = TASK_TRANSITIONS[currentState];
  if (!possibleTransitions) {
    return { success: false, error: `Invalid current task state: "${currentState}"` };
  }

  const nextState = possibleTransitions[event];
  if (!nextState) {
    return {
      success: false,
      error: `Cannot transition task from state "${TASK_STATE_DISPLAY[currentState]}" using event "${event}"`,
    };
  }

  return { success: true, nextState };
}

export function isValidGoalTransition(currentState: GoalState, event: GoalEvent): boolean {
  return !!(GOAL_TRANSITIONS[currentState] && GOAL_TRANSITIONS[currentState][event]);
}

export function isValidTaskTransition(currentState: TaskState, event: TaskEvent): boolean {
  return !!(TASK_TRANSITIONS[currentState] && TASK_TRANSITIONS[currentState][event]);
}
