import React, { useState } from "react";

const mockUploadedResumeResponse = {
  name: "Sanjeev Kumar",
  email: "sanjeev.kumar@example.com",
  phone: "+91 9876543210",
  core_skills: ["Python", "React", "C++"],
  soft_skills: ["team player", "hardworking"],
  work_experience: [
    {
      company: "Deloitte",
      role: "Data Analytics Intern",
      duration: "Jun 2024 - Aug 2024",
      accomplishments: [
        "Completed Deloitte Australia job simulation",
        "Performed various data analyses with Python",
      ],
    },
  ],
  education: [
    {
      institution: "ABC College of Engineering",
      degree: "B.Tech in Computer Science",
      year: "2021-2025",
    },
  ],
  resume_rating: 8,
  improvement_areas:
    "Add more quantifiable achievements and tailor skills section to job description.",
  upskill_suggestions:
    "Learn advanced React hooks, dive deeper into machine learning with Python libraries.",
};

const mockPastResumes = [
  {
    id: 1,
    filename: "resume_sanjeev.pdf",
    name: "Sanjeev Kumar",
    email: "sanjeev.kumar@example.com",
    phone: "+91 9876543210",
    details: mockUploadedResumeResponse,
  },
  {
    id: 2,
    filename: "resume_ritu.pdf",
    name: "Ritu Sharma",
    email: "ritu.sharma@example.com",
    phone: "+91 9123456789",
    details: {
      name: "Ritu Sharma",
      email: "ritu.sharma@example.com",
      phone: "+91 9123456789",
      core_skills: ["Java", "Spring Boot", "SQL"],
      soft_skills: ["problem solver", "adaptable"],
      work_experience: [
        {
          company: "Infosys",
          role: "Software Engineer",
          duration: "Jul 2023 - Present",
          accomplishments: ["Developed backend microservices", "Enhanced database queries"],
        },
      ],
      education: [
        {
          institution: "XYZ University",
          degree: "B.E. in Information Technology",
          year: "2019-2023",
        },
      ],
      resume_rating: 7,
      improvement_areas: "Include more recent projects and certifications.",
      upskill_suggestions:
        "Focus on cloud certifications (AWS/GCP) and modern Java frameworks.",
    },
  },
];

function ResumeDetails({ data, onClose }) {
  if (!data) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 50,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 20,
        maxWidth: 600,
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          float: "right",
          border: "none",
          background: "transparent",
          fontSize: 18,
          cursor: "pointer",
        }}
        aria-label="Close modal"
      >
        &times;
      </button>
      <h2>Resume Details: {data.name}</h2>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Phone:</strong> {data.phone}
      </p>
      <section>
        <h3>Core Skills</h3>
        <ul>
          {data.core_skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Soft Skills</h3>
        <ul>
          {data.soft_skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Work Experience</h3>
        {data.work_experience?.map((exp, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <p>
              <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
            </p>
            <ul>
              {exp.accomplishments?.map((acc, idx) => (
                <li key={idx}>{acc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <h3>Education</h3>
        {data.education?.map((edu, i) => (
          <p key={i}>
            {edu.degree} from {edu.institution} ({edu.year})
          </p>
        ))}
      </section>
      <section>
        <h3>Resume Rating</h3>
        <p>{data.resume_rating} / 10</p>
      </section>
      <section>
        <h3>Improvement Areas</h3>
        <p>{data.improvement_areas}</p>
      </section>
      <section>
        <h3>Upskill Suggestions</h3>
        <p>{data.upskill_suggestions}</p>
      </section>
    </div>
  );
}

export default function ResumeAnalyzerApp() {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedData, setUploadedData] = useState(null);
  const [pastResumes, setPastResumes] = useState(mockPastResumes);
  const [modalData, setModalData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Simulate a resume upload call
  const handleUpload = (event) => {
    event.preventDefault();
    setUploadError("");
    const fileInput = event.target.elements.resume.files[0];
    if (!fileInput) {
      setUploadError("Please select a file to upload.");
      return;
    }
    // Here you would call the API to upload file and get response
    setUploading(true);

    setTimeout(() => {
      // Mock API response
      setUploadedData(mockUploadedResumeResponse);
      // Add this to past resumes assuming backend returned an ID & filename
      setPastResumes((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          filename: fileInput.name,
          name: mockUploadedResumeResponse.name,
          email: mockUploadedResumeResponse.email,
          phone: mockUploadedResumeResponse.phone,
          details: mockUploadedResumeResponse,
        },
      ]);
      setUploading(false);
    }, 1200);
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center" }}>Resume Analyzer</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab("upload")}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            cursor: "pointer",
            borderBottom: activeTab === "upload" ? "3px solid #007bff" : "none",
            background: "none",
            border: "none",
            fontWeight: activeTab === "upload" ? "bold" : "normal",
          }}
        >
          Upload Resume
        </button>
        <button
          onClick={() => setActiveTab("past")}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            borderBottom: activeTab === "past" ? "3px solid #007bff" : "none",
            background: "none",
            border: "none",
            fontWeight: activeTab === "past" ? "bold" : "normal",
          }}
        >
          Past Resumes
        </button>
      </div>

      {activeTab === "upload" && (
        <>
          <form onSubmit={handleUpload} style={{ marginBottom: 20 }}>
            <label htmlFor="resume" style={{ display: "block", marginBottom: 8 }}>
              Select resume (PDF only):
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              disabled={uploading}
              required
            />
            <br />
            <button
              type="submit"
              style={{
                marginTop: 12,
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 4,
              }}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload & Analyze"}
            </button>
            {uploadError && (
              <p style={{ color: "red", marginTop: 8 }}>{uploadError}</p>
            )}
          </form>

          {uploadedData && (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: 6,
                padding: 20,
                backgroundColor: "#f9f9f9",
              }}
            >
              <h2>Extracted Resume Information</h2>
              <p>
                <strong>Name:</strong> {uploadedData.name}
              </p>
              <p>
                <strong>Email:</strong> {uploadedData.email}
              </p>
              <p>
                <strong>Phone:</strong> {uploadedData.phone}
              </p>

              <section>
                <h3>Core Skills</h3>
                <ul>
                  {uploadedData.core_skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Soft Skills</h3>
                <ul>
                  {uploadedData.soft_skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Work Experience</h3>
                {uploadedData.work_experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <p>
                      <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
                    </p>
                    <ul>
                      {exp.accomplishments.map((acc, idx) => (
                        <li key={idx}>{acc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section>
                <h3>Education</h3>
                {uploadedData.education.map((edu, i) => (
                  <p key={i}>
                    {edu.degree} from {edu.institution} ({edu.year})
                  </p>
                ))}
              </section>

              <section>
                <h3>Resume Rating</h3>
                <p>{uploadedData.resume_rating} / 10</p>
              </section>

              <section>
                <h3>Improvement Areas</h3>
                <p>{uploadedData.improvement_areas}</p>
              </section>

              <section>
                <h3>Upskill Suggestions</h3>
                <p>{uploadedData.upskill_suggestions}</p>
              </section>
            </div>
          )}
        </>
      )}

      {activeTab === "past" && (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 10,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{ borderBottom: "1px solid #ccc", padding: 8, textAlign: "left" }}
                >
                  Filename
                </th>
                <th
                  style={{ borderBottom: "1px solid #ccc", padding: 8, textAlign: "left" }}
                >
                  Name
                </th>
                <th
                  style={{ borderBottom: "1px solid #ccc", padding: 8, textAlign: "left" }}
                >
                  Email
                </th>
                <th
                  style={{ borderBottom: "1px solid #ccc", padding: 8, textAlign: "left" }}
                >
                  Phone
                </th>
                <th
                  style={{ borderBottom: "1px solid #ccc", padding: 8, textAlign: "left" }}
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {pastResumes.map((r) => (
                <tr key={r.id}>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                    {r.filename}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                    {r.name}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                    {r.email}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                    {r.phone}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                    <button
                      onClick={() => setModalData(r.details)}
                      style={{
                        padding: "6px 12px",
                        cursor: "pointer",
                        border: "1px solid #007bff",
                        backgroundColor: "#fff",
                        color: "#007bff",
                        borderRadius: 4,
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalData && (
            <ResumeDetails data={modalData} onClose={() => setModalData(null)} />
          )}
        </>
      )}
    </div>
  );
}
