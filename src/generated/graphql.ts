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
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
};

export type Story = {
  __typename?: 'Story';
  storyID: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Maybe<Person>>>;
  personsAggregate?: Maybe<PersonAggregateResult>;
};


export type StoryPersonsArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type StoryPersonsAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}

export type PointRef = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type NearFilter = {
  distance: Scalars['Float'];
  coordinate: PointRef;
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

export type PersonFilter = {
  personID?: Maybe<StringHashFilter>;
  name?: Maybe<StringTermFilter>;
  has?: Maybe<PersonHasFilter>;
  and?: Maybe<Array<Maybe<PersonFilter>>>;
  or?: Maybe<Array<Maybe<PersonFilter>>>;
  not?: Maybe<PersonFilter>;
};

export type Person = {
  __typename?: 'Person';
  personID: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  gender?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  parent?: Maybe<Array<Maybe<Person>>>;
  nonBioParent?: Maybe<Array<Maybe<Person>>>;
  nonBioParentParent?: Maybe<Array<Maybe<Person>>>;
  physicalRelation?: Maybe<Array<Maybe<Person>>>;
  otherRelation?: Maybe<Array<Maybe<Person>>>;
  story?: Maybe<Story>;
  parentAggregate?: Maybe<PersonAggregateResult>;
  nonBioParentAggregate?: Maybe<PersonAggregateResult>;
  nonBioParentParentAggregate?: Maybe<PersonAggregateResult>;
  physicalRelationAggregate?: Maybe<PersonAggregateResult>;
  otherRelationAggregate?: Maybe<PersonAggregateResult>;
};


export type PersonParentArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type PersonNonBioParentArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type PersonNonBioParentParentArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type PersonPhysicalRelationArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type PersonOtherRelationArgs = {
  filter?: Maybe<PersonFilter>;
  order?: Maybe<PersonOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type PersonStoryArgs = {
  filter?: Maybe<StoryFilter>;
};


export type PersonParentAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonNonBioParentAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonNonBioParentParentAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonPhysicalRelationAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type PersonOtherRelationAggregateArgs = {
  filter?: Maybe<PersonFilter>;
};


export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
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

export type AddStoryInput = {
  title?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Maybe<PersonRef>>>;
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

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  between?: Maybe<IntRange>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
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

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
};

export type PersonRef = {
  personID?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  gender?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  parent?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParent?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParentParent?: Maybe<Array<Maybe<PersonRef>>>;
  physicalRelation?: Maybe<Array<Maybe<PersonRef>>>;
  otherRelation?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};

export type StoryRef = {
  storyID?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Maybe<PersonRef>>>;
};

export type Point = {
  __typename?: 'Point';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
};

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  aggregate?: Maybe<Scalars['Boolean']>;
};

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  between?: Maybe<Int64Range>;
};

export type StoryOrder = {
  asc?: Maybe<StoryOrderable>;
  desc?: Maybe<StoryOrderable>;
  then?: Maybe<StoryOrder>;
};

export type FloatRange = {
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type Int64Range = {
  min: Scalars['Int64'];
  max: Scalars['Int64'];
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateTimeRange>;
};

export type PersonAggregateResult = {
  __typename?: 'PersonAggregateResult';
  count?: Maybe<Scalars['Int']>;
  personIDMin?: Maybe<Scalars['String']>;
  personIDMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  genderMin?: Maybe<Scalars['String']>;
  genderMax?: Maybe<Scalars['String']>;
  dateOfBirthMin?: Maybe<Scalars['Int']>;
  dateOfBirthMax?: Maybe<Scalars['Int']>;
  dateOfBirthSum?: Maybe<Scalars['Int']>;
  dateOfBirthAvg?: Maybe<Scalars['Float']>;
  dateOfDeathMin?: Maybe<Scalars['Int']>;
  dateOfDeathMax?: Maybe<Scalars['Int']>;
  dateOfDeathSum?: Maybe<Scalars['Int']>;
  dateOfDeathAvg?: Maybe<Scalars['Float']>;
};

export enum StoryOrderable {
  Title = 'title'
}

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type UpdatePersonInput = {
  filter: PersonFilter;
  set?: Maybe<PersonPatch>;
  remove?: Maybe<PersonPatch>;
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

export enum PersonHasFilter {
  PersonId = 'personID',
  Name = 'name',
  NickNames = 'nickNames',
  Gender = 'gender',
  DateOfBirth = 'dateOfBirth',
  DateOfDeath = 'dateOfDeath',
  Location = 'location',
  Parent = 'parent',
  NonBioParent = 'nonBioParent',
  NonBioParentParent = 'nonBioParentParent',
  PhysicalRelation = 'physicalRelation',
  OtherRelation = 'otherRelation',
  Story = 'story'
}

export enum PersonOrderable {
  PersonId = 'personID',
  Name = 'name',
  Gender = 'gender',
  DateOfBirth = 'dateOfBirth',
  DateOfDeath = 'dateOfDeath'
}

export type AddPersonInput = {
  personID: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  gender?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  parent?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParent?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParentParent?: Maybe<Array<Maybe<PersonRef>>>;
  physicalRelation?: Maybe<Array<Maybe<PersonRef>>>;
  otherRelation?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

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

export type IntRange = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type StoryAggregateResult = {
  __typename?: 'StoryAggregateResult';
  count?: Maybe<Scalars['Int']>;
  titleMin?: Maybe<Scalars['String']>;
  titleMax?: Maybe<Scalars['String']>;
};

export type PersonPatch = {
  name?: Maybe<Scalars['String']>;
  nickNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  gender?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Int']>;
  dateOfDeath?: Maybe<Scalars['Int']>;
  location?: Maybe<Array<Maybe<Scalars['Int']>>>;
  parent?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParent?: Maybe<Array<Maybe<PersonRef>>>;
  nonBioParentParent?: Maybe<Array<Maybe<PersonRef>>>;
  physicalRelation?: Maybe<Array<Maybe<PersonRef>>>;
  otherRelation?: Maybe<Array<Maybe<PersonRef>>>;
  story?: Maybe<StoryRef>;
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
  personID: Scalars['String'];
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

export type DateTimeRange = {
  min: Scalars['DateTime'];
  max: Scalars['DateTime'];
};

export type StringRange = {
  min: Scalars['String'];
  max: Scalars['String'];
};

export type StoryFilter = {
  storyID?: Maybe<Array<Scalars['ID']>>;
  title?: Maybe<StringTermFilter>;
  has?: Maybe<StoryHasFilter>;
  and?: Maybe<Array<Maybe<StoryFilter>>>;
  or?: Maybe<Array<Maybe<StoryFilter>>>;
  not?: Maybe<StoryFilter>;
};

export type UpdateStoryInput = {
  filter: StoryFilter;
  set?: Maybe<StoryPatch>;
  remove?: Maybe<StoryPatch>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>;
  multiPolygon?: Maybe<MultiPolygonRef>;
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

export enum StoryHasFilter {
  Title = 'title',
  Persons = 'persons'
}

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  between?: Maybe<StringRange>;
};

export type PersonOrder = {
  asc?: Maybe<PersonOrderable>;
  desc?: Maybe<PersonOrderable>;
  then?: Maybe<PersonOrder>;
};

export type StoryPatch = {
  title?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Maybe<PersonRef>>>;
};


export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  between?: Maybe<FloatRange>;
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
    )>, parent?: Maybe<Array<Maybe<(
      { __typename: 'Person' }
      & Pick<Person, 'name' | 'personID'>
    )>>>, nonBioParent?: Maybe<Array<Maybe<(
      { __typename: 'Person' }
      & Pick<Person, 'name' | 'personID'>
    )>>>, physicalRelation?: Maybe<Array<Maybe<(
      { __typename: 'Person' }
      & Pick<Person, 'name' | 'personID'>
    )>>> }
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

export type PersonWithLinksFieldsFragment = (
  { __typename?: 'Person' }
  & { story?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, 'title'>
  )>, parent?: Maybe<Array<Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>>>, nonBioParent?: Maybe<Array<Maybe<(
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
  & Pick<Person, 'personID' | 'name' | 'dateOfBirth' | 'nickNames' | 'gender'>
);

export const PersonFieldsFragmentDoc = gql`
    fragment PersonFields on Person {
  personID
  name
  dateOfBirth
  nickNames
  gender
}
    `;
export const PersonWithLinksFieldsFragmentDoc = gql`
    fragment PersonWithLinksFields on Person {
  ...PersonFields
  story {
    title
  }
  parent {
    ...PersonFields
  }
  nonBioParent {
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
    __typename
    personID
    name
    dateOfBirth
    nickNames
    story {
      title
    }
    parent {
      __typename
      name
      personID
    }
    nonBioParent {
      __typename
      name
      personID
    }
    physicalRelation {
      __typename
      name
      personID
    }
  }
}
    `;
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
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;