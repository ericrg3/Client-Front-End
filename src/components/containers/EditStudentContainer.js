/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';
import { Redirect } from 'react-router-dom';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      campusId: null, 
      redirect: false, 
      redirectId: null,
      email: "",
      gpa: 0.0,
      imageURL: null,
    };
  }
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    
    if(!(this.props.allCampuses.map(({id}) => id)).includes(parseInt(this.state.campusId))){
      alert("CampusId is not valid, please enter a valid campusId.")
      this.setState({
        redirect: false
      })
    }
    else{
      let student = this.state.student
      student.firstname = this.state.firstname
      student.lastname = this.state.lastname
      student.campusId = this.state.campusId
      student.imageURL = this.state.imageURL
      student.gpa = this.state.gpa
      student.email = this.state.email
 
      await this.props.editStudent(student);

      // Update state, and trigger redirect to show the new student.
      this.setState({
        firstname: '', 
        lastname: '', 
        campusId: '', 
        email: '',
        imageURL: '',
        gpa: '',
        redirect: true
      });
    }
  }

  //Render new student view
  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.props.match.params.id}`}/>)
    }
    return (
      <div>
        <Header />
        <EditStudentView student={this.props.student} 
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}
        allCampuses={this.props.allCampuses}
        />
      </div>
    );
  }
}
const mapState = (state) => {
    return {
      student: state.student,
      allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
    };
  };
  
  // 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
  // The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
  const mapDispatch = (dispatch) => {
    return {
      fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
      editStudent: (student) => dispatch(editStudentThunk(student)),
      
    };
  };
  
  
  // Export store-connected container by default
  // StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
  // (and re-read the values when the Store State updates).
  export default connect(mapState, mapDispatch)(EditStudentContainer);
