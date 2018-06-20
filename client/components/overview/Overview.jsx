import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Summary from './Summary.jsx';
import StarDistribution from './StarDistribution.jsx';
import LovedFor from './LovedFor.jsx';
import overview from './helperFunctions.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalReviews : 1381,
      neighborhood : 'SOMA',
      overallRating : 0,
      foodRating : 0,
      serviceRating : 0,
      ambienceRating : 0,
      valueRating : 0,
      noiseLevel : 0,
      recommended : false,
      fiveStarReviews : 0,
      fourStarReviews : 0,
      threeStarReviews : 0,
      twoStarReviews : 0,
      oneStarReviews : 0
    }

    this.displayAllReviews = this.displayAllReviews.bind(this);
  }

  componentDidMount() {
    this.displayAllReviews();
  }

  displayAllReviews(props) {
    axios.get(`/reviews/restaurant/${this.props.restaurantId}/reviews`)
      .then( response => {
        this.setState({
          totalReviews : response.data.length,
          overallRating : overview.overallRating(response.data),
          foodRating : overview.foodRating(response.data),
          serviceRating : overview.serviceRating(response.data),
          ambienceRating : overview.ambienceRating(response.data),
          valueRating : overview.valueRating(response.data),
          noiseLevel : overview.noiseLevel(overview.noise(response.data)),
          recommended : overview.recommended(response.data),
          fiveStarReviews : overview.fiveStarReviews(response.data),
          fourStarReviews : overview.fourStarReviews(response.data),
          threeStarReviews : overview.threeStarReviews(response.data),
          twoStarReviews : overview.twoStarReviews(response.data),
          oneStarReviews : overview.oneStarReviews(response.data)
        });
        
      })
      .catch( error => {
        console.log(error);
      }) 
  }

  render() {
    return (
      <div className="overview">
        <div>
          <h2><b>What {this.state.totalReviews} People Are Saying</b></h2>
        </div>
        <hr></hr>
        <div><Summary restaurant={this.state}/></div>
        <div><StarDistribution restaurant={this.state}/></div>
        <div><LovedFor/></div>
      </div>  
    );
  }
}

export default Overview;