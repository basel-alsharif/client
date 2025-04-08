interface Type {
  [key: string]: string | number ;
}

const SearchBoxStyle: Type = {
  width: '100%',
  borderRadius: '999px',
  backgroundColor: '#eee',
  paddingLeft: 2,
  paddingRight: 2,
  marginBottom: '10px',

};

const SelectInputStyle: Type = {
  backgroundColor: '#eee',
  borderRadius: '999px',
  width: '100%'
};

export { SearchBoxStyle, SelectInputStyle };
