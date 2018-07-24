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
    axios.get(`http://127.0.0.1:3020/restaurant/${this.props.restaurantId}/reviews`)
      .then( response => {
        let overviewData = {
          totalReviews : response.data.length,
          overallRating: 0,
          foodRating: 0,
          serviceRating: 0,
          ambienceRating: 0,           
          valueRating: 0,       
          noiseLevel: 0,
          recommended: 0,
          fiveStarReviews : 0,
          fourStarReviews : 0,
          threeStarReviews : 0,
          twoStarReviews : 0,          
          oneStarReviews :0
        }
        
        response.data.map( item => {
          overviewData.overallRating += item.overall_rating;
          overviewData.foodRating += item.food_rating;
          overviewData.serviceRating += item.service_rating;
          overviewData.ambienceRating += item.ambiance_rating ;           
          overviewData.valueRating += item.value_rating;      
          overviewData.noiseLevel += item.food_rating;
          if (item.recommended) overviewData.recommended += 1;
          if (item.overall_rating === 5) overviewData.fiveStarReviews += 1;
          if (item.overall_rating === 4) overviewData.fourStarReviews += 1;
          if (item.overall_rating === 3) overviewData.threeStarReviews += 1;
          if (item.overall_rating === 2) overviewData.twoStarReviews += 1;        
          if (item.overall_rating === 1) overviewData.oneStarReviews += 1;
        });

        const getAverage = (total) => {
          return Math.round( (total/response.data.length) * 10 ) / 10;
        };

        overviewData.overallRating = getAverage(overviewData.overallRating);
        overviewData.foodRating = getAverage( overviewData.foodRating); 
        overviewData.serviceRating = getAverage(overviewData.serviceRating); 
        overviewData.ambienceRating = getAverage(overviewData.ambienceRating);            
        overviewData.valueRating = getAverage(overviewData.valueRating);      
        overviewData.noiseLevel = getAverage(overviewData.noiseLevel); 
        overviewData.recommended = getAverage(overviewData.recommended)*100;

        this.setState({
          totalReviews: response.data.length,
          overallRating : overviewData.overallRating,
          foodRating : overviewData.foodRating,
          serviceRating : overviewData.serviceRating,
          ambienceRating : overviewData.ambienceRating,
          valueRating : overviewData.valueRating,
          noiseLevel : overviewData.noiseLevel,
          recommended : overviewData.recommended,
          fiveStarReviews : overviewData.fiveStarReviews,
          fourStarReviews : overviewData.fourStarReviews,
          threeStarReviews : overviewData.threeStarReviews,
          twoStarReviews : overviewData.twoStarReviews,
          oneStarReviews : overviewData.oneStarReviews,
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
          <h2><b>What the heck {this.state.totalReviews} People Are Saying</b></h2>
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