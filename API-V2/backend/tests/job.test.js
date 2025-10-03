const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const api = supertest(app)
const Job = require('../models/jobModel')
const User = require("../models/userModel");

const jobs = [
    {
  title: "Software Engineer",
  type: "Full-time",
  description: "Develop and maintain scalable web applications using JavaScript and Node.js.",
  company: {
    name: "TechNova Inc.",
    contactEmail: "hr@technova.com",
    contactPhone: "+1-555-123-4567",
    website: "https://www.technova.com",
    size: 250
  },
  location: "Remote",
  salary: 95000,
  experienceLevel: "Mid",
  postedDate: "2025-10-01T08:00:00Z",
  status: "open",
  applicationDeadline: "2025-11-01T23:59:59Z",
  requirements: ["JavaScript", "Node.js", "MongoDB", "REST APIs"]
},
    {
  title: "Graphic Designer",
  type: "Part-time",
  description: "Create visual assets for marketing campaigns and social media.",
  company: {
    name: "Creative Pulse",
    contactEmail: "design@creativepulse.io",
    contactPhone: "+44-20-7946-0958",
    website: "https://www.creativepulse.io",
    size: 40
  },
  location: "London, UK",
  salary: 30000,
  experienceLevel: "Entry",
  postedDate: "2025-09-28T10:30:00Z",
  status: "open",
  applicationDeadline: "2025-10-15T17:00:00Z",
  requirements: ["Adobe Photoshop", "Illustrator", "Creativity", "Portfolio"]
}
];

let token = null;

beforeAll(async()=> {
    await User.deleteMany({});
    const result = await api 
    .post('/api/users/signup')
    .send({
        name: "Johan Lindström",
        username: "johan_lind",
        password: "JohanSecure456!",
        phone_number: "+46-73-987-6543",
        gender: "Male",
        date_of_birth: "1988-11-03T00:00:00Z",
        membership_status: "Trial",
        bio: "Backend developer exploring cloud-native architectures.",
        address: "Vasagatan 5, Stockholm, Sweden",
        profile_picture: "https://example.com/images/johan.png"
});
    token = result.body.token;
})


describe("Given there are initially some jobs saved ", () => {
    beforeEach(async () => {
        await Job.deleteMany({});
        //await Job.insertMany(jobs);
        await Promise.all([
            api
            .post('/api/jobs')
            .set('Authorization', 'bearer ' + token)
            .send(jobs[0]),

            api
            .post('/api/jobs')
            .set('Authorization', 'bearer ' + token)
            .send(jobs[1]),
        ]);
    });

    // Test GET /api/jobs
    it("should return all jobs as JSON when GET /api/jobs is called", 
        async()=> {
            await api
                .get("/api/jobs")
                .set('Authorization', 'bearer ' + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });


    // Test POST /api/tours
    it("should create a new job when POST /api/jobs is called", async() => {
        const newJob = {
            title: "DevOps Engineer",
            type: "Contract",
            description: "Implement CI/CD pipelines and manage cloud infrastructure.",
            company: {
                name: "CloudForge",
                contactEmail: "jobs@cloudforge.net",
                contactPhone: "+61-2-9876-5432",
                website: "https://www.cloudforge.net",
                size: 120
            },
            location: "Sydney, Australia",
            salary: 70000,
            experienceLevel: "Senior",
            postedDate: "2025-09-25T09:15:00Z",
            status: "open",
            applicationDeadline: "2025-10-20T00:00:00Z",
            requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"]
};

        await api
            .post("/api/jobs")
            .set('Authorization', 'bearer ' + token)
            .send(newJob)
            .expect(201)
            //.expect("Content-Type", /application\/json/)

        // const jobsAfterPost = await Job.find({})
        // expect(jobsAfterPost).toHaveLength(jobs.length+1);
        // const jobTitles = jobsAfterPost.map((job) => job.title);
        // expect(jobTitles).toContain(newJob.title) 
    })

    // Test GET /api/jobs/:id
    it("should return one job by its ID when GET /api/jobs/:id is called", async () => {
        const job = await Job.findOne();
        await api
            .get(`/api/jobs/${job._id}`)
            .set('Authorization', 'bearer ' + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    // it("should return a 404 for a non-existing job ID", async () => {
    //     const nonExistentId = new mongoose.Types.ObjectId();
    //     await api.get(`/api/jobs/${nonExistentId}`).expect(404)
    // });

    it("should update one job with partial data when PUT / api/jobs/:id is called", async () => {
        const job =await Job.findOne();
        const updatedJob = {
            title: "Updated title"
        };

        const response = await api
            .put(`/api/jobs/${job._id}`)
            .set('Authorization', 'bearer ' + token)
            .send(updatedJob)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        console.log('Response body:', response.body);
        
        const updatedJobCheck = await Job.findById(job._id);
        console.log('updated job:', updatedJobCheck);
        expect(updatedJobCheck.title).toBe(updatedJob.title)
    });

    // it("should return 400 for invalid tour ID when PUT /api/job/:id", async () => {
    //     const invalidId = "12345";
    //     await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
    //   });

    it("should delete on job by its ID when DELETE api/jobs/:id is called", async () => {
        const job = await Job.findOne();
        await api
        .delete(`/api/jobs/${job._id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(204)

        const deletedJobCheck = await Job.findById(job._id)
        expect(deletedJobCheck).toBeNull();
    });

    // it("should return 400 for invalid job ID when DELETE /api/jobs/:id is called", async () => {
    //     const invalidId = "12345";
    //     await api.delete(`/api/jobs/${invalidId}`).expect(400)
    // })

     afterAll(() => {
        mongoose.connection.close();
      });

})