# Self assessment for Ode #
We did everything on Donya's computer, but we spilt the workload.

##Here is everything that we did:##
- backend with authorization; user mvc, job mvc, requireAuth middleware and deployment of the backend. 
- frontend (full-stack); Fetching jobs, updating, deleting and adding jobs, signup and login, authorization and protected routes, dynamic routing for navbar. Also deployment of the full-stack app.


##Here is what the LLM said about jobControllers.js in the API-V2:##
- Your code is solid: clean CRUD structure, error handling, ObjectId checks, and sorted queries.

###Main improvements:###
- Use a consistent response format ({ success, message, data }).
- Validate req.body before saving/updating (e.g. Joi, express-validator).
- Add authorization so only the job’s owner can update/delete.
- Return deleted job instead of just 204.
- Use a logger instead of console.error.
- Add pagination for getAllJobs if many records.
- Minor cleanup: use Job.create() and simplify update/delete calls.

##Here is what the LLM said about AddJobPage.jsx in the frontend with auhtentication##
Your component works and covers all fields, but it’s quite verbose.

###Strengths:###

- Controlled inputs for all fields.
- Token auth handled via localStorage.
- Proper form submission with preventDefault.

###Improvements:###
- Too many useState calls → consider a single state object (useState({ title: "", type: "Full-Time", ... })) to simplify.
- Validation: inputs are marked required, but more checks (email format, phone format) would help.
- Error handling: addJob only logs errors — show user feedback instead.
- Navigation: only redirect if job was successfully added (if (await addJob(newJob)) navigate("/")).
- Code reuse: onChange={(e) => setX(e.target.value)} is repetitive → create a generic handler.
- Form UX: textarea for requirements, maybe group company fields into a sub-component.

##Here is what the LLM said about Navbar.jsx in the frontend with authentication##
Your Navbar is simple and works, but here’s a quick assessment:

###Strengths:###

- Clean conditional rendering for logged-in vs logged-out users.
- Properly clears localStorage on logout.
- Clear structure with Links for navigation.

###Improvements:###

- Repeated JSON.parse(localStorage.getItem('user')) could throw errors if no user → store user in state or context instead.
- Styling/structure: wrapping links in a <div> for both states is fine, but could be simplified.
-Logout: might also redirect user (e.g., navigate('/')) after clearing.
-handleClick doesn’t need (e) since the event isn’t used.
