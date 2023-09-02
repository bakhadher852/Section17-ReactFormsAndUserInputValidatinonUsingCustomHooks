import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  //first name
  const {
    value: enteredFirstName,
    //isValid coming from !valueIsValid && isTouched
    isValid: enteredFirstNameIsValid,
    //hasError coming from validate the input and isTouched also to add css class and render error message
    hasError: firstNameInputHasError,
    //from onChange
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: FirstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim() !== "");
  //last name
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");
  //email
  // Regular expression for a valid email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,

    hasError: emailInputHasError,

    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => emailRegex.test(value));

  //Form code start from here

  let formIsValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredFirstNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredEmailIsValid
    ) {
      return;
    }

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };
  const firstNameInputClasses = firstNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="FirstName">First Name</label>
          <input
            type="text"
            id="FirstName"
            onChange={firstNameChangedHandler}
            onBlur={FirstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <p className="error-text">First Name must not be empty.</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
          />
          {lastNameInputHasError && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
