import * as css from './index.styl'
import React, { PureComponent } from 'react'
import { graphql, QueryOpts } from 'react-apollo';
import debounce from 'lodash/debounce';
import classnames from 'classnames';

import {
  compose,
  withState,
  withProps,
} from 'recompose';

import Result from './components/Result';
import Count from './components/Count';

import { WITH_SEARCH_QUERY } from '../hocs/withSearch';


const MINIMUM_LENGTH_FOR_SEARCH = 3;
const DEFAULT_SEARCH_TERM = '';
const DEFAULT_SEARCH_CATEGORY = '';
const DEFAULT_SEARCH_SOURCE = '';

interface Props {
  term: string
  category: string
  source: string
  results: Array<any>
  loading: boolean
  counts: any
  setSearchTerm: Function
  setSearchSource: Function
  setSearchCategory: Function
}

class Index extends PureComponent <Props, {}> {
  state = {
    term: this.props.term,
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.inputHolder}>
          {this.renderInput()}
          {this.props.counts && this.renderCounts(this.props.counts)}
        </div>
        {this.renderResults()}
      </div>
    )
  }

  renderInput = () => (
    <input 
      className={css.input}
      onChange={this.onInputChange}
      value={this.state.term}
    />
  )

  renderCounts = (counts) => (
    <div className={css.counts}>
      {Object.keys(counts).map(category => (
        <Count
          key={category}
          count={counts[category]}
          category={category}
          onClick={this.setSearchCategory}
        />
      ))}
    </div>
  )

  renderResults(){
    const {
      results,
      loading
    } = this.props;

    if(loading){
      return 'Loading...';
    }

    if(!results){
      return 'No results...';
    }

    return (
      <div className={css.results}>
        {results.map(result => <Result
            key={result.id}
            record={result}
            setSearchSource={this.setSearchSource}
            setSearchCategory={this.setSearchCategory}
          />)}
      </div>
    )
  }

  onInputChange = e => {
    this.setState({ term: e.target.value });
    this.setSearchTerm(e.target.value);
  }

  setSearchCategory = category => this.props.setSearchCategory(category)
  setSearchSource = source => this.props.setSearchSource(source)

  setSearchTerm = debounce(term => {
    console.log('Search update', term);
    this.props.setSearchTerm(term);
  }, 350)
}

const enhance = compose(
  // NOTE: This is a fast way to prototype this, but it leads to uncessary nesting.
  // Likely I would just have a "search HOC" that has these handlers.
  withState('term', 'setSearchTerm', DEFAULT_SEARCH_TERM),
  withState('category', 'setSearchCategory', DEFAULT_SEARCH_CATEGORY),
  withState('source', 'setSearchSource', DEFAULT_SEARCH_SOURCE),
  graphql(WITH_SEARCH_QUERY, {

    // NOTE: We could do a lot here - polling, pushing results, etc

    options: ({ term, category, source }:QueryOpts & Props) => {
      const AND = [];
      if(term){
        AND.push({terms_some: {
          term_contains: term
        }})
      }
      if(category){
        AND.push({ category })
      }
      if(source){
        AND.push({ source })
      }
      return ({
        variables: {
          filter: AND.length > 1 ? { AND } : AND[0],
          orderBy: 'timestamp_DESC'
        }
      })
    },
    skip: ({ term, category, source }) => (
      term.length <= MINIMUM_LENGTH_FOR_SEARCH && !category && !source
    )
  }),
  withProps(props => {
    if(!props.data || props.data.loading){
      return {
        ...props,
        loading: props.data ? props.data.loading : false
      };
    }

    const counts = {
      'DOCUMENT': 'UNKNOWN',
      'MESSAGE': 'UNKNOWN',
      'PERSON': 'UNKNOWN',
      'EVENT': 'UNKNOWN',
    };

    if(props.data && !props.data.loading){
      props.data.allArtifactses.reduce((acc, artifact) => {
        if(acc[artifact.category] === 'UNKNOWN') acc[artifact.category] = 0;
        acc[artifact.category]++;
        return acc;
      }, counts)
    }

    return {
      ...props,
      ...props.data,
      counts,
      results: props.data && props.data.allArtifactses ? props.data.allArtifactses : []
    }
  })
);

// @ts-ignore - deal with obtuse typing later...
export default enhance(Index);
