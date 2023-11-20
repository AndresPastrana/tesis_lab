export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export class DuplicateCiError extends CustomError {
  constructor(ci: string) {
    super(`Ya existe una persona con CI ${ci}.`);
    this.name = "DuplicateCiError";
  }
}

export class DuplicateEmailError extends CustomError {
  constructor(email: string) {
    super(`Ya existe una persona con el correo electrónico ${email}.`);
    this.name = "DuplicateEmailError";
  }
}
