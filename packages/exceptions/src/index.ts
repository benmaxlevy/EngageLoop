export class BaseException extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}

export class GoalNotFoundException extends BaseException {
  constructor(goalId: string) {
    super(`Goal with ID "${goalId}" not found`, 'GOAL_NOT_FOUND', 404);
  }
}

export class TaskNotFoundException extends BaseException {
  constructor(taskId: string) {
    super(`Task with ID "${taskId}" not found`, 'TASK_NOT_FOUND', 404);
  }
}

export class InvalidTransitionException extends BaseException {
  constructor(entity: 'goal' | 'task', currentState: string, event: string) {
    super(`Cannot transition ${entity} from state "${currentState}" using event "${event}"`, 'INVALID_TRANSITION', 400);
  }
}

export class TerminalStateLockedException extends BaseException {
  constructor(state: string) {
    super(`Cannot modify tasks when the Goal is in a terminal state (${state})`, 'TERMINAL_STATE_LOCKED', 400);
  }
}

function createSerializedException(name: string, message?: string, code?: string, statusCode?: number): BaseException {
  const err = new BaseException(message || 'An error occurred', code || 'UNKNOWN_ERROR', statusCode || 500);
  err.name = name;
  return err;
}

export function deserializeException(json: unknown): Error {
  if (json && typeof json === 'object') {
    const data = json as Record<string, unknown>;
    const name = data.name;
    const message = data.message as string | undefined;
    const code = data.code as string | undefined;
    const statusCode = data.statusCode as number | undefined;

    if (typeof name === 'string') {
      switch (name) {
        case 'GoalNotFoundException':
          return new GoalNotFoundException(message?.match(/"([^"]+)"/)?.[1] || '');
        case 'TaskNotFoundException':
          return new TaskNotFoundException(message?.match(/"([^"]+)"/)?.[1] || '');
        case 'InvalidTransitionException':
          return createSerializedException(name, message, code, statusCode);
        case 'TerminalStateLockedException':
          return createSerializedException(name, message, code, statusCode);
        default: {
          return createSerializedException(name, message, code, statusCode);
        }
      }
    }
  }
  const fallbackMessage = json && typeof json === 'object' && 'message' in json && typeof (json as Record<string, unknown>).message === 'string'
    ? ((json as Record<string, unknown>).message as string)
    : 'An unknown error occurred';
  return new Error(fallbackMessage);
}
