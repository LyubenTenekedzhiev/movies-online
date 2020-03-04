import React from 'react';
import { connect } from 'react-redux';

import Movies from '../Movies/Movies';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <h1 >Popular series</h1>
            <Movies url={this.props.popularMovies} />
  
         <h1  >Popular series</h1>
            <Movies url={this.props.popularSeries} />
  
           <h1  >For the whole family</h1>
            <Movies url={this.props.familyMovies} />
  
          <h1 >Documentaries</h1>
            <Movies url={this.props.documentaries} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    popularMovies: state.movieReducer.popularMovies,
    popularSeries: state.movieReducer.popularSeries,
    familyMovies: state.movieReducer.familyMovies,
    documentaries: state.movieReducer.documentaries,
  }
}

export default connect(mapStateToProps)(LandingPage);