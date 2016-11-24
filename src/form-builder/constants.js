export const formBuilderConstants = {
  conceptUrl: '/openmrs/ws/rest/v1/concept',
  conceptRepresentation: 'custom:(uuid,display,allowDecimal,name:(uuid,name),' +
  'conceptClass:(uuid,name),datatype:(uuid,name),setMembers,answers)',
  exceptionMessages: {
    conceptMissing: 'Please associate Concept to Obs',
  },
  formResourceUrl: (formUuid) => `/openmrs/ws/rest/v1/form/${formUuid}/resource`,
  formResourceDataType: 'org.openmrs.customdatatype.datatype.FreeTextDatatype',
  formUrl: '/openmrs/ws/rest/v1/form',
  supportedDataTypes: 'Boolean,Text,Numeric,Coded',
};
