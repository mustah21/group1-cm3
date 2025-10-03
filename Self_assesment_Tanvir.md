Self-Assessment
Example 1: Enhancing Error Handling in useLogin Hook
The original useLogin hook handled login requests but lacked robust error handling for unexpected responses. Here's a snippet of the original code:
// Original useLogin snippet
const login = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
    });
    const user = await response.json();
    if (!response.ok) {
        setError(user.error);
        setIsLoading(false);
        return error;
    }
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
};

Issues:

No handling for missing user.error in the response.
Premature return of error could cause race conditions.

Refactored code with improved error handling:
// Improved useLogin snippet
const login = async (object) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object),
        });
        const user = await response.json();
        if (!response.ok) {
            throw new Error(user.error || "Login failed: Unknown error");
        }
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
        return { success: true };
    } catch (err) {
        setError(err.message);
        setIsLoading(false);
        return { success: false, error: err.message };
    }
};

Key Improvements:

Added try-catch for network or parsing errors.
Provided a fallback error message for undefined user.error.
Returned consistent { success, error } object for better component handling.


Example 2: Adding Validation to Signup Component
The original Signup component lacked input validation, risking invalid data submissions. Here's a snippet of the problematic code:
// Original Signup submit handler
const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
        username: username.value,
        password: password.value,
        name: name.value,
        // ... other fields
    });
    if (!error) {
        console.log("success");
        navigate("/");
    }
};

Issues:

No validation for required fields or formats.
Incorrect input type for profile_picture.

Refactored code with validation:
// Improved Signup submit handler
const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!username.value || !password.value || !name.value) {
        alert("Name, username, and password are required!");
        return;
    }
    if (password.value.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }
    await signup({
        username: username.value,
        password: password.value,
        name: name.value,
        // ... other fields
    });
    if (!error) {
        console.log("success");
        navigate("/");
    }
};

Lessons Learned:

Client-side validation prevents invalid server requests.
Proper input types (e.g., file for profile_picture) improve usability.
Immediate user feedback via alerts enhances the signup experience.
