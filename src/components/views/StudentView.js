/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  if (student.gpa !== null) { 
    let gpa = student.gpa 
    if (gpa % 1 === 0) { 
      gpa = gpa.toFixed(1); 
    }
  }

  // Render a single Student view 
  return (
    <div>
      <h1>Student Name: {student.firstname + " " + student.lastname}</h1>
      <h2>{"Students Email: " + student.email}</h2>
      <div>
      <h6>Student ID: {student.id}</h6>
      <img src={student.imageUrl} alt="Student Profile"/>
          <Link to={`/editstudent/${student.id}`}>
          </Link>
      </div>
      <div>
          <h3>{student.firstname + " " + student.lastname} is not enrolled at a school.</h3>
        
        </div>
      
        <Link to={`/campus/${student.campus.id}`}>
      <h3>{student.campus.name}</h3>
      </Link>
      <h3 className="text"><span className="label">GPA:</span> {student.gpa}</h3>

      <br />
      <button onClick={() => {deleteStudent(student.id); alert("Student Deleted!")}}>Delete Student</button>
      <br />
    </div>
  );

};

export default StudentView;

