import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import { gql } from 'graphql.macro';
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

export type AddPersonInput = {
  children?: Maybe<Array<Maybe<PersonRef>>>;
  cx?: Maybe<Scalars['Float']>;
  cy?: Maybe<Scalars['Float']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  nonBioChildren?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParents?: Maybe<Array<Maybe<PersonRef>>>;
  otherRelation?: Maybe<Array<Maybe<PersonRef>>>;
  parents?: Maybe<Array<Maybe<PersonRef>>>;
  personID: Scalars['String'];
  physicalRelation?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};

export type AddPersonPayload = {
  __typename?: 'AddPersonPayload';
  numUids?: Maybe<Scalars['Int']>;
  person?: Maybe<Array<Maybe<Person>>>;
};


export type AddPersonPayloadPersonArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};

export type AddStoryInput = {
  persons?: Maybe<Array<Maybe<PersonRef>>>;
  storyID: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type AddStoryPayload = {
  __typename?: 'AddStoryPayload';
  numUids?: Maybe<Scalars['Int']>;
  story?: Maybe<Array<Maybe<Story>>>;
};


export type AddStoryPayloadStoryArgs = {
  filter?: Maybe<StoryFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<StoryOrder>;
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  rule?: Maybe<Scalars['String']>;
};

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type CustomHttp = {
  body?: Maybe<Scalars['String']>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  graphql?: Maybe<Scalars['String']>;
  introspectionHeaders?: Maybe<Array<Scalars['String']>>;
  method: HttpMethod;
  mode?: Maybe<Mode>;
  secretHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
  url: Scalars['String'];
};


export type DateTimeFilter = {
  between?: Maybe<DateTimeRange>;
  eq?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
};

export type DateTimeRange = {
  max: Scalars['DateTime'];
  min: Scalars['DateTime'];
};

export type DeletePersonPayload = {
  __typename?: 'DeletePersonPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
  person?: Maybe<Array<Maybe<Person>>>;
};


export type DeletePersonPayloadPersonArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};

export type DeleteStoryPayload = {
  __typename?: 'DeleteStoryPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
  story?: Maybe<Array<Maybe<Story>>>;
};


export type DeleteStoryPayloadStoryArgs = {
  filter?: Maybe<StoryFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<StoryOrder>;
};

export enum DgraphIndex {
  Bool = 'bool',
  Day = 'day',
  Exact = 'exact',
  Float = 'float',
  Fulltext = 'fulltext',
  Geo = 'geo',
  Hash = 'hash',
  Hour = 'hour',
  Int = 'int',
  Int64 = 'int64',
  Month = 'month',
  Regexp = 'regexp',
  Term = 'term',
  Trigram = 'trigram',
  Year = 'year'
}

export type FloatFilter = {
  between?: Maybe<FloatRange>;
  eq?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
};

export type FloatRange = {
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
};

export type GenerateQueryParams = {
  aggregate?: Maybe<Scalars['Boolean']>;
  get?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
};

export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT'
}


export type Int64Filter = {
  between?: Maybe<Int64Range>;
  eq?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
};

export type Int64Range = {
  max: Scalars['Int64'];
  min: Scalars['Int64'];
};

export type IntFilter = {
  between?: Maybe<IntRange>;
  eq?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
};

export type IntRange = {
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type IntersectsFilter = {
  multiPolygon?: Maybe<MultiPolygonRef>;
  polygon?: Maybe<PolygonRef>;
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPerson?: Maybe<AddPersonPayload>;
  addStory?: Maybe<AddStoryPayload>;
  deletePerson?: Maybe<DeletePersonPayload>;
  deleteStory?: Maybe<DeleteStoryPayload>;
  updatePerson?: Maybe<UpdatePersonPayload>;
  updateStory?: Maybe<UpdateStoryPayload>;
};


export type MutationAddPersonArgs = {
  input: Array<AddPersonInput>;
};


export type MutationAddStoryArgs = {
  input: Array<AddStoryInput>;
};


export type MutationDeletePersonArgs = {
  filter: PersonFilter;
};


export type MutationDeleteStoryArgs = {
  filter: StoryFilter;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput;
};


export type MutationUpdateStoryArgs = {
  input: UpdateStoryInput;
};

export type NearFilter = {
  coordinate: PointRef;
  distance: Scalars['Float'];
};

export type Person = {
  __typename?: 'Person';
  children?: Maybe<Array<Maybe<Person>>>;
  childrenAggregate?: Maybe<PersonAggregateResult>;
  cx?: Maybe<Scalars['Float']>;
  cy?: Maybe<Scalars['Float']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  nonBioChildren?: Maybe<Array<Maybe<Person>>>;
  nonBioChildrenAggregate?: Maybe<PersonAggregateResult>;
  nonBioParents?: Maybe<Array<Maybe<Person>>>;
  nonBioParentsAggregate?: Maybe<PersonAggregateResult>;
  otherRelation?: Maybe<Array<Maybe<Person>>>;
  otherRelationAggregate?: Maybe<PersonAggregateResult>;
  parents?: Maybe<Array<Maybe<Person>>>;
  parentsAggregate?: Maybe<PersonAggregateResult>;
  personID: Scalars['String'];
  physicalRelation?: Maybe<Array<Maybe<Person>>>;
  physicalRelationAggregate?: Maybe<PersonAggregateResult>;
  story?: Maybe<Story>;
};


export type PersonChildrenArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type PersonChildrenAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonNonBioChildrenArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type PersonNonBioChildrenAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonNonBioParentsArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type PersonNonBioParentsAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonOtherRelationArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type PersonOtherRelationAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonParentsArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type PersonParentsAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonPhysicalRelationArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type PersonPhysicalRelationAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonStoryArgs = {
  filter?: Maybe<StoryFilter>;
};

export type PersonAggregateResult = {
  __typename?: 'PersonAggregateResult';
  count?: Maybe<Scalars['Int']>;
  cxAvg?: Maybe<Scalars['Float']>;
  cxMax?: Maybe<Scalars['Float']>;
  cxMin?: Maybe<Scalars['Float']>;
  cxSum?: Maybe<Scalars['Float']>;
  cyAvg?: Maybe<Scalars['Float']>;
  cyMax?: Maybe<Scalars['Float']>;
  cyMin?: Maybe<Scalars['Float']>;
  cySum?: Maybe<Scalars['Float']>;
  dateOfBirthMax?: Maybe<Scalars['String']>;
  dateOfBirthMin?: Maybe<Scalars['String']>;
  dateOfDeathMax?: Maybe<Scalars['String']>;
  dateOfDeathMin?: Maybe<Scalars['String']>;
  genderMax?: Maybe<Scalars['String']>;
  genderMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  personIDMax?: Maybe<Scalars['String']>;
  personIDMin?: Maybe<Scalars['String']>;
};

export type PersonFilter = {
  and?: Maybe<Array<Maybe<PersonFilter>>>;
  has?: Maybe<PersonHasFilter>;
  name?: Maybe<StringTermFilter>;
  not?: Maybe<PersonFilter>;
  or?: Maybe<Array<Maybe<PersonFilter>>>;
  personID?: Maybe<StringHashFilter>;
};

export enum PersonHasFilter {
  Children = 'children',
  Cx = 'cx',
  Cy = 'cy',
  DateOfBirth = 'dateOfBirth',
  DateOfDeath = 'dateOfDeath',
  Gender = 'gender',
  Location = 'location',
  Name = 'name',
  NickNames = 'nickNames',
  NonBioChildren = 'nonBioChildren',
  NonBioParents = 'nonBioParents',
  OtherRelation = 'otherRelation',
  Parents = 'parents',
  PersonId = 'personID',
  PhysicalRelation = 'physicalRelation',
  Story = 'story'
}

export type PersonOrder = {
  asc?: Maybe<PersonOrderable>;
  desc?: Maybe<PersonOrderable>;
  then?: Maybe<PersonOrder>;
};

export enum PersonOrderable {
  Cx = 'cx',
  Cy = 'cy',
  DateOfBirth = 'dateOfBirth',
  DateOfDeath = 'dateOfDeath',
  Gender = 'gender',
  Name = 'name',
  PersonId = 'personID'
}

export type PersonPatch = {
  children?: Maybe<Array<Maybe<PersonRef>>>;
  cx?: Maybe<Scalars['Float']>;
  cy?: Maybe<Scalars['Float']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  nonBioChildren?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParents?: Maybe<Array<Maybe<PersonRef>>>;
  otherRelation?: Maybe<Array<Maybe<PersonRef>>>;
  parents?: Maybe<Array<Maybe<PersonRef>>>;
  physicalRelation?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};

export type PersonRef = {
  children?: Maybe<Array<Maybe<PersonRef>>>;
  cx?: Maybe<Scalars['Float']>;
  cy?: Maybe<Scalars['Float']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  nonBioChildren?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParents?: Maybe<Array<Maybe<PersonRef>>>;
  otherRelation?: Maybe<Array<Maybe<PersonRef>>>;
  parents?: Maybe<Array<Maybe<PersonRef>>>;
  personID?: Maybe<Scalars['String']>;
  physicalRelation?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};

export type Point = {
  __typename?: 'Point';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type PointRef = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type PolygonGeoFilter = {
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type Query = {
  __typename?: 'Query';
  aggregatePerson?: Maybe<PersonAggregateResult>;
  aggregateStory?: Maybe<StoryAggregateResult>;
  getPerson?: Maybe<Person>;
  getStory?: Maybe<Story>;
  queryPerson?: Maybe<Array<Maybe<Person>>>;
  queryStory?: Maybe<Array<Maybe<Story>>>;
};


export type QueryAggregatePersonArgs = {
  filter?: Maybe<PersonFilter>;
};


export type QueryAggregateStoryArgs = {
  filter?: Maybe<StoryFilter>;
};


export type QueryGetPersonArgs = {
  personID: Scalars['String'];
};


export type QueryGetStoryArgs = {
  storyID: Scalars['String'];
};


export type QueryQueryPersonArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type QueryQueryStoryArgs = {
  filter?: Maybe<StoryFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<StoryOrder>;
};

export type Story = {
  __typename?: 'Story';
  persons?: Maybe<Array<Maybe<Person>>>;
  personsAggregate?: Maybe<PersonAggregateResult>;
  storyID: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};


export type StoryPersonsArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};


export type StoryPersonsAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};

export type StoryAggregateResult = {
  __typename?: 'StoryAggregateResult';
  count?: Maybe<Scalars['Int']>;
  storyIDMax?: Maybe<Scalars['String']>;
  storyIDMin?: Maybe<Scalars['String']>;
  titleMax?: Maybe<Scalars['String']>;
  titleMin?: Maybe<Scalars['String']>;
};

export type StoryFilter = {
  and?: Maybe<Array<Maybe<StoryFilter>>>;
  has?: Maybe<StoryHasFilter>;
  not?: Maybe<StoryFilter>;
  or?: Maybe<Array<Maybe<StoryFilter>>>;
  storyID?: Maybe<StringHashFilter>;
  title?: Maybe<StringTermFilter>;
};

export enum StoryHasFilter {
  Persons = 'persons',
  StoryId = 'storyID',
  Title = 'title'
}

export type StoryOrder = {
  asc?: Maybe<StoryOrderable>;
  desc?: Maybe<StoryOrderable>;
  then?: Maybe<StoryOrder>;
};

export enum StoryOrderable {
  StoryId = 'storyID',
  Title = 'title'
}

export type StoryPatch = {
  persons?: Maybe<Array<Maybe<PersonRef>>>;
  title?: Maybe<Scalars['String']>;
};

export type StoryRef = {
  persons?: Maybe<Array<Maybe<PersonRef>>>;
  storyID?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type StringExactFilter = {
  between?: Maybe<StringRange>;
  eq?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StringRange = {
  max: Scalars['String'];
  min: Scalars['String'];
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type UpdatePersonInput = {
  filter: PersonFilter;
  remove?: Maybe<PersonPatch>;
  set?: Maybe<PersonPatch>;
};

export type UpdatePersonPayload = {
  __typename?: 'UpdatePersonPayload';
  numUids?: Maybe<Scalars['Int']>;
  person?: Maybe<Array<Maybe<Person>>>;
};


export type UpdatePersonPayloadPersonArgs = {
  filter?: Maybe<PersonFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<PersonOrder>;
};

export type UpdateStoryInput = {
  filter: StoryFilter;
  remove?: Maybe<StoryPatch>;
  set?: Maybe<StoryPatch>;
};

export type UpdateStoryPayload = {
  __typename?: 'UpdateStoryPayload';
  numUids?: Maybe<Scalars['Int']>;
  story?: Maybe<Array<Maybe<Story>>>;
};


export type UpdateStoryPayloadStoryArgs = {
  filter?: Maybe<StoryFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<StoryOrder>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type GetAllPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPersonsQuery = (
  { __typename?: 'Query' }
  & { queryPerson?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonWithLinksFieldsFragment
  )>>> }
);

export type GetPersonByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetPersonByNameQuery = (
  { __typename?: 'Query' }
  & { queryPerson?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonWithLinksFieldsFragment
  )>>> }
);

export type GetPersonByUidQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetPersonByUidQuery = (
  { __typename?: 'Query' }
  & { getPerson?: Maybe<(
    { __typename?: 'Person' }
    & PersonWithLinksFieldsFragment
  )> }
);

export type GetPersonDetailsByUidQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetPersonDetailsByUidQuery = (
  { __typename?: 'Query' }
  & { getPerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'dateOfDeath'>
    & { story?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'title'>
    )> }
    & PersonFieldsFragment
  )> }
);

export type GetStartNodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStartNodesQuery = (
  { __typename?: 'Query' }
  & { queryPerson?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & { story?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'title'>
    )>, children?: Maybe<Array<Maybe<(
      { __typename?: 'Person' }
      & PersonFieldsFragment
    )>>>, parents?: Maybe<Array<Maybe<(
      { __typename?: 'Person' }
      & PersonFieldsFragment
    )>>>, nonBioChildren?: Maybe<Array<Maybe<(
      { __typename?: 'Person' }
      & PersonFieldsFragment
    )>>> }
    & PersonFieldsFragment
  )>>> }
);

export type GetStoryByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetStoryByIdQuery = (
  { __typename?: 'Query' }
  & { getStory?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, 'storyID' | 'title'>
    & { persons?: Maybe<Array<Maybe<(
      { __typename?: 'Person' }
      & PersonWithLinksFieldsFragment
    )>>> }
  )> }
);

export type PersonWithLinksFieldsFragment = (
  { __typename?: 'Person' }
  & { story?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, 'title'>
  )>, children?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>>>, parents?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>>>, nonBioChildren?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>>>, nonBioParents?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>>>, physicalRelation?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>>>, otherRelation?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>>> }
  & PersonFieldsFragment
);

export type PersonFieldsFragment = (
  { __typename?: 'Person' }
  & Pick<Person, 'personID' | 'name' | 'dateOfBirth' | 'dateOfDeath' | 'nickNames' | 'gender' | 'cx' | 'cy'>
);

export const PersonFieldsFragmentDoc = gql`
    fragment PersonFields on Person {
  personID
  name
  dateOfBirth
  dateOfDeath
  nickNames
  gender
  cx
  cy
}
    `;
export const PersonWithLinksFieldsFragmentDoc = gql`
    fragment PersonWithLinksFields on Person {
  ...PersonFields
  story {
    title
  }
  children {
    ...PersonFields
  }
  parents {
    ...PersonFields
  }
  nonBioChildren {
    ...PersonFields
  }
  nonBioParents {
    ...PersonFields
  }
  physicalRelation {
    ...PersonFields
  }
  otherRelation {
    ...PersonFields
  }
}
    ${PersonFieldsFragmentDoc}`;
export const GetAllPersonsDocument = gql`
    query getAllPersons {
  queryPerson {
    ...PersonWithLinksFields
  }
}
    ${PersonWithLinksFieldsFragmentDoc}`;
export const GetPersonByNameDocument = gql`
    query getPersonByName($name: String!) {
  queryPerson(filter: {name: {allofterms: $name}}) {
    ...PersonWithLinksFields
  }
}
    ${PersonWithLinksFieldsFragmentDoc}`;
export const GetPersonByUidDocument = gql`
    query getPersonByUid($uid: String!) {
  getPerson(personID: $uid) {
    ...PersonWithLinksFields
  }
}
    ${PersonWithLinksFieldsFragmentDoc}`;
export const GetPersonDetailsByUidDocument = gql`
    query getPersonDetailsByUid($uid: String!) {
  getPerson(personID: $uid) {
    ...PersonFields
    dateOfDeath
    story {
      title
    }
  }
}
    ${PersonFieldsFragmentDoc}`;
export const GetStartNodesDocument = gql`
    query getStartNodes {
  queryPerson(filter: {name: {allofterms: "Pa Salt"}}) {
    ...PersonFields
    story {
      title
    }
    children {
      ...PersonFields
    }
    parents {
      ...PersonFields
    }
    nonBioChildren {
      ...PersonFields
    }
  }
}
    ${PersonFieldsFragmentDoc}`;
export const GetStoryByIdDocument = gql`
    query getStoryById($id: String!) {
  getStory(storyID: $id) {
    storyID
    title
    persons {
      ...PersonWithLinksFields
    }
  }
}
    ${PersonWithLinksFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAllPersons(variables?: GetAllPersonsQueryVariables): Promise<GetAllPersonsQuery> {
      return withWrapper(() => client.request<GetAllPersonsQuery>(print(GetAllPersonsDocument), variables));
    },
    getPersonByName(variables: GetPersonByNameQueryVariables): Promise<GetPersonByNameQuery> {
      return withWrapper(() => client.request<GetPersonByNameQuery>(print(GetPersonByNameDocument), variables));
    },
    getPersonByUid(variables: GetPersonByUidQueryVariables): Promise<GetPersonByUidQuery> {
      return withWrapper(() => client.request<GetPersonByUidQuery>(print(GetPersonByUidDocument), variables));
    },
    getPersonDetailsByUid(variables: GetPersonDetailsByUidQueryVariables): Promise<GetPersonDetailsByUidQuery> {
      return withWrapper(() => client.request<GetPersonDetailsByUidQuery>(print(GetPersonDetailsByUidDocument), variables));
    },
    getStartNodes(variables?: GetStartNodesQueryVariables): Promise<GetStartNodesQuery> {
      return withWrapper(() => client.request<GetStartNodesQuery>(print(GetStartNodesDocument), variables));
    },
    getStoryById(variables: GetStoryByIdQueryVariables): Promise<GetStoryByIdQuery> {
      return withWrapper(() => client.request<GetStoryByIdQuery>(print(GetStoryByIdDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;