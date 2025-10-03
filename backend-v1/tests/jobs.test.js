const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Jobs = require("../models/jobModel");

const initialjobs = [
  {
    title: "Software Engineer",
    type: "Full-time",
    description: "We are looking for a skilled software engineer to join our development team.",
    company: {
      name: "Tech Innovations Ltd",
      contactEmail: "hr@techinnovations.com",
      contactPhone: "+1-555-123-4567",
      website: "https://www.techinnovations.com",
      size: 250
    },
    location: "Helsinki, Finland",
    salary: 60000,
    experienceLevel: "Mid",
    postedDate: "2025-10-03T10:00:00.000Z",
    status: "open",
    applicationDeadline: "2025-12-31T23:59:59.000Z",
    requirements: [
      "Proficiency in JavaScript and Node.js",
      "Experience with MongoDB and Mongoose",
      "Knowledge of REST APIs",
      "Good problem-solving skills"
    ]
  }
];

beforeEach(async () => {
  await Jobs.deleteMany({});
  const jobsObject = new Jobs(initialjobs[0]);
  await jobsObject.save();
});

describe("Jobs API", () => {
  // GET all
  it("should return all jobs", async () => {
    const response = await api.get("/api/jobs");
    expect(response.body).toHaveLength(initialjobs.length);
  });

  it("should include a specific job in the returned list", async () => {
    const response = await api.get("/api/jobs");
    const titles = response.body.map(job => job.title);
    expect(titles).toContain("Software Engineer");
  });

  it("should return jobs in JSON format", async () => {
    await api.get("/api/jobs").expect(200).expect("Content-Type", /application\/json/);
  });

  // GET by id
  it("should return a job by id", async () => {
    const jobsAtStart = await Jobs.find({});
    const jobToView = jobsAtStart[0];

    const response = await api.get(`/api/jobs/${jobToView._id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(jobToView.title);
  });

  // POST
  it("should create a new job", async () => {
    const newJob = {
      title: "UI/UX Designer",
      type: "Contract",
      description: "Redesign our mobile and web apps with strong focus on UX.",
      company: {
        name: "Creative Studio Oy",
        contactEmail: "careers@creativestudio.fi",
        contactPhone: "+358-40-123-4567",
        website: "https://www.creativestudio.fi",
        size: 45
      },
      location: "Remote",
      salary: 3500,
      experienceLevel: "Entry",
      requirements: ["Experience with Figma", "Strong design portfolio"]
    };

    await api.post("/api/jobs").send(newJob).expect(201).expect("Content-Type", /application\/json/);

    const jobsAtEnd = await Jobs.find({});
    expect(jobsAtEnd).toHaveLength(initialjobs.length + 1);

    const titles = jobsAtEnd.map(job => job.title);
    expect(titles).toContain("UI/UX Designer");
  });

  // PUT
  it("should update an existing job", async () => {
    const jobsAtStart = await Jobs.find({});
    const jobToUpdate = jobsAtStart[0];

    const updatedData = { ...jobToUpdate._doc, salary: 70000 };

    const response = await api
      .put(`/api/jobs/${jobToUpdate._id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.salary).toBe(70000);
  });

  // DELETE
  it("should delete a job", async () => {
    const jobsAtStart = await Jobs.find({});
    const jobToDelete = jobsAtStart[0];

    await api.delete(`/api/jobs/${jobToDelete._id}`).expect(204);

    const jobsAtEnd = await Jobs.find({});
    expect(jobsAtEnd).toHaveLength(initialjobs.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
