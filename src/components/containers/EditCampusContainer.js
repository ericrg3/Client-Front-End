import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import EditCampusView from '../views/EditCampusView'

class EditCampusContainer extends Component {
    componentDidMount() {
      this.props.fetchCampus(this.props.match.params.id);
    }
    // Capture input data when it is entered
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value,
        id: this.props.match.params.id
      });
    }

    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.


        // Add new student in back-end database
        // Update state, and trigger redirect to show the new campus
        this.setState({
          name: this.state.campusname, 
          imageUrl: this.state.imageUrl,
          address: this.state.campusaddress, 
          description: this.state.campusdescription,
          redirect: true, 
          id: this.props.match.params.id,
        });

        // Edit new campus in back-end database
        await this.props.editCampus(this.state);
      }

      componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
    render() {
        // Redirect to new campus's page after submit
            // Display the input form via the corresponding View component
        return (
          <div>
            <Header />
            <EditCampusView
              handleChange = {this.handleChange} 
              handleSubmit={this.handleSubmit}    
              campus={this.props.campus}
            />
          </div>          
        );
      }
    }

    const mapState = (state) => {
        return {
          campus: state.campus,  // Get the State object from Reducer "student"
        };
      };
      // The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
      // The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
      // The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
      const mapDispatch = (dispatch) => {
          return({
            fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
            editCampus: (campus) => dispatch(editCampusThunk(campus)),
          })
      }
      
      // Export store-connected container by default
      // NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
      // (and re-read the values when the Store State updates).
      export default connect(mapState, mapDispatch)(EditCampusContainer);