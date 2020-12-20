import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
};

export type StoryRef = {
  storyID?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}

export type AddStoryInput = {
  title?: Maybe<Scalars['String']>;
};

export type PersonRef = {
  personID?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  related?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};

export type PersonPatch = {
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  related?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  between?: Maybe<StringRange>;
};

export enum PersonOrderable {
  Name = 'name',
  DateOfBirth = 'dateOfBirth',
  DateOfDeath = 'dateOfDeath'
}

export type Story = {
  __typename?: 'Story';
  storyID: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type CustomHttp = {
  url: Scalars['String'];
  method: HttpMethod;
  body?: Maybe<Scalars['String']>;
  graphql?: Maybe<Scalars['String']>;
  mode?: Maybe<Mode>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  secretHeaders?: Maybe<Array<Scalars['String']>>;
  introspectionHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type StringRange = {
  min: Scalars['String'];
  max: Scalars['String'];
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export enum StoryOrderable {
  Title = 'title'
}

export type AddPersonPayload = {
  __typename?: 'AddPersonPayload';
  person?: Maybe<Array<Maybe<Person>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddPersonPayloadPersonArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum StoryHasFilter {
  Title = 'title'
}

export type Int64Range = {
  min: Scalars['Int64'];
  max: Scalars['Int64'];
};

export type PointRef = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
};

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  between?: Maybe<FloatRange>;
};

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateTimeRange>;
};

export type Person = {
  __typename?: 'Person';
  personID: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  related?: Maybe<Array<Maybe<Person>>>;
  story?: Maybe<Story>;
  relatedAggregate?: Maybe<PersonAggregateResult>;
};


export type PersonRelatedArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type PersonStoryArgs = {
  filter?: Maybe<StoryFilter>;
};


export type PersonRelatedAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};

export type IntRange = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type UpdateStoryInput = {
  filter: StoryFilter;
  set?: Maybe<StoryPatch>;
  remove?: Maybe<StoryPatch>;
};

export type DateTimeRange = {
  min: Scalars['DateTime'];
  max: Scalars['DateTime'];
};

export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type UpdatePersonPayload = {
  __typename?: 'UpdatePersonPayload';
  person?: Maybe<Array<Maybe<Person>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdatePersonPayloadPersonArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StoryFilter = {
  storyID?: Maybe<Array<Scalars['ID']>>;
  title?: Maybe<StringTermFilter>;
  has?: Maybe<StoryHasFilter>;
  and?: Maybe<Array<Maybe<StoryFilter>>>;
  or?: Maybe<Array<Maybe<StoryFilter>>>;
  not?: Maybe<StoryFilter>;
};

export type Point = {
  __typename?: 'Point';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  aggregate?: Maybe<Scalars['Boolean']>;
};

export type AddStoryPayload = {
  __typename?: 'AddStoryPayload';
  story?: Maybe<Array<Maybe<Story>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddStoryPayloadStoryArgs = {
  filter?: Maybe<StoryFilter>;
  order?: Maybe<StoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type PersonAggregateResult = {
  __typename?: 'PersonAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  dateOfBirthMin?: Maybe<Scalars['Int']>;
  dateOfBirthMax?: Maybe<Scalars['Int']>;
  dateOfBirthSum?: Maybe<Scalars['Int']>;
  dateOfBirthAvg?: Maybe<Scalars['Float']>;
  dateOfDeathMin?: Maybe<Scalars['Int']>;
  dateOfDeathMax?: Maybe<Scalars['Int']>;
  dateOfDeathSum?: Maybe<Scalars['Int']>;
  dateOfDeathAvg?: Maybe<Scalars['Float']>;
};

export type StoryAggregateResult = {
  __typename?: 'StoryAggregateResult';
  count?: Maybe<Scalars['Int']>;
  titleMin?: Maybe<Scalars['String']>;
  titleMax?: Maybe<Scalars['String']>;
};

export type UpdatePersonInput = {
  filter: PersonFilter;
  set?: Maybe<PersonPatch>;
  remove?: Maybe<PersonPatch>;
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
};

export type FloatRange = {
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type NearFilter = {
  distance: Scalars['Float'];
  coordinate: PointRef;
};

export type StoryPatch = {
  title?: Maybe<Scalars['String']>;
};

export enum DgraphIndex {
  Int = 'int',
  Int64 = 'int64',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Geo = 'geo'
}

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export enum PersonHasFilter {
  Name = 'name',
  NickNames = 'nickNames',
  DateOfBirth = 'dateOfBirth',
  DateOfDeath = 'dateOfDeath',
  Location = 'location',
  Related = 'related',
  Story = 'story'
}

export type UpdateStoryPayload = {
  __typename?: 'UpdateStoryPayload';
  story?: Maybe<Array<Maybe<Story>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateStoryPayloadStoryArgs = {
  filter?: Maybe<StoryFilter>;
  order?: Maybe<StoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type PersonFilter = {
  personID?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<StringTermFilter>;
  has?: Maybe<PersonHasFilter>;
  and?: Maybe<Array<Maybe<PersonFilter>>>;
  or?: Maybe<Array<Maybe<PersonFilter>>>;
  not?: Maybe<PersonFilter>;
};

export type PersonOrder = {
  asc?: Maybe<PersonOrderable>;
  desc?: Maybe<PersonOrderable>;
  then?: Maybe<PersonOrder>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPerson?: Maybe<AddPersonPayload>;
  updatePerson?: Maybe<UpdatePersonPayload>;
  deletePerson?: Maybe<DeletePersonPayload>;
  addStory?: Maybe<AddStoryPayload>;
  updateStory?: Maybe<UpdateStoryPayload>;
  deleteStory?: Maybe<DeleteStoryPayload>;
};


export type MutationAddPersonArgs = {
  input: Array<AddPersonInput>;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput;
};


export type MutationDeletePersonArgs = {
  filter: PersonFilter;
};


export type MutationAddStoryArgs = {
  input: Array<AddStoryInput>;
};


export type MutationUpdateStoryArgs = {
  input: UpdateStoryInput;
};


export type MutationDeleteStoryArgs = {
  filter: StoryFilter;
};

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  between?: Maybe<Int64Range>;
};

export type DeletePersonPayload = {
  __typename?: 'DeletePersonPayload';
  person?: Maybe<Array<Maybe<Person>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeletePersonPayloadPersonArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>;
  multiPolygon?: Maybe<MultiPolygonRef>;
};

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  between?: Maybe<IntRange>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type DeleteStoryPayload = {
  __typename?: 'DeleteStoryPayload';
  story?: Maybe<Array<Maybe<Story>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteStoryPayloadStoryArgs = {
  filter?: Maybe<StoryFilter>;
  order?: Maybe<StoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddPersonInput = {
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  related?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};


export type StoryOrder = {
  asc?: Maybe<StoryOrderable>;
  desc?: Maybe<StoryOrderable>;
  then?: Maybe<StoryOrder>;
};

export type Query = {
  __typename?: 'Query';
  getPerson?: Maybe<Person>;
  queryPerson?: Maybe<Array<Maybe<Person>>>;
  aggregatePerson?: Maybe<PersonAggregateResult>;
  getStory?: Maybe<Story>;
  queryStory?: Maybe<Array<Maybe<Story>>>;
  aggregateStory?: Maybe<StoryAggregateResult>;
};


export type QueryGetPersonArgs = {
  personID: Scalars['ID'];
};


export type QueryQueryPersonArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregatePersonArgs = {
  filter?: Maybe<PersonFilter>;
};


export type QueryGetStoryArgs = {
  storyID: Scalars['ID'];
};


export type QueryQueryStoryArgs = {
  filter?: Maybe<StoryFilter>;
  order?: Maybe<StoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateStoryArgs = {
  filter?: Maybe<StoryFilter>;
};

export type GetAllPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPersonsQuery = (
  { __typename?: 'Query' }
  & { queryPerson?: Maybe<Array<Maybe<(
    { __typename: 'Person' }
    & Pick<Person, 'personID' | 'name' | 'dateOfBirth' | 'nickNames'>
    & { story?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'title'>
    )>, related?: Maybe<Array<Maybe<(
      { __typename: 'Person' }
      & Pick<Person, 'name' | 'personID'>
    )>>> }
  )>>> }
);


export const GetAllPersonsDocument = gql`
    query getAllPersons {
  queryPerson {
    __typename
    personID
    name
    dateOfBirth
    nickNames
    story {
      title
    }
    related {
      __typename
      name
      personID
    }
  }
}
    `;

/**
 * __useGetAllPersonsQuery__
 *
 * To run a query within a React component, call `useGetAllPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPersonsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPersonsQuery, GetAllPersonsQueryVariables>) {
        return Apollo.useQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, baseOptions);
      }
export function useGetAllPersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPersonsQuery, GetAllPersonsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, baseOptions);
        }
export type GetAllPersonsQueryHookResult = ReturnType<typeof useGetAllPersonsQuery>;
export type GetAllPersonsLazyQueryHookResult = ReturnType<typeof useGetAllPersonsLazyQuery>;
export type GetAllPersonsQueryResult = Apollo.QueryResult<GetAllPersonsQuery, GetAllPersonsQueryVariables>;