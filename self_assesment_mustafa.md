# Self-Assessment (Template)

### Example 1: Improving Code Quality

Usesignup is functional but it does lack robustness and proper validation checks in the frontend for a clean and concise user experience

```javascript
// Usesignup
import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    const user = await response.json();

    if (!response.ok) {
      console.log(user.error);
      setError(user.error);
      setIsLoading(false);
      return error;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { signup, isLoading, error };
}
```

Initialize states as useState(false) and useState(null).

-Wrap fetch in try/catch to handle network errors.

-Don’t return error from signup; just rely on the state.

-Return the user object from signup for easier usage 

-To address these issues, we refactored the code to handle edge cases effectively:  



### Key Improvements:
-Initialize states as useState(false) and useState(null).

-Wrap fetch in try/catch to handle network errors.

-Don’t return error from signup; just rely on the state.

-Return the user object from signup for easier usage 

-To address these issues, we refactored the code to handle edge cases effectively:  

---

### Example 2: Debugging Route Order in App.jsx

We encountered an issue with routing in our app.js. When we clicked on update new job it kept on taking me to add new job page.  

```React
// Problem
It was more of a problem of how the imports were called in App.jsx. The routing was flawed. At the time it felt like something massive was happening behind the scenes.
```

### Solution:
After carefully analyzing each route. We found the error. The flawed imports are attached below.  

```App.jsx
import EditJobPage from "./pages/AddJobPage";
import JobPage from "./pages/AddJobPage";
```

**Lessons Learned:**

1. **With coding never underestimate even the smallest of tasks** It was a small error but the headache was big, taught me never to rush through without checking.

## Here is what the LLM said about our no-auth code ##
Your Navbar is simple and works, but here’s a quick assessment:

### Strengths: ###

- Crud operations were working flawlessly.
- As for the no-auth version everything works as it should.
- Forms coded with no explicit mistakes.

### Improvements: ###

- Small errors in camel casing ends up crashing the app.
- Lacked css properties, it couldve been much better.
-  Logging errors in console.
