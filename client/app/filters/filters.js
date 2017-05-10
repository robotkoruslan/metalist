let filtersModule = angular.module('metalistTicketsApp.filters', [])
  .filter('money', () => {
    return (amount) => {
      if (amount) {
        return amount + ' UAH';
      }
      return amount;
    };
  })
  .name;

export default filtersModule;