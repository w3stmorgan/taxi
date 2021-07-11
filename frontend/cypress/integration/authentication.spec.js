const logIn = () => {
  const { username, password } = Cypress.env('credentials');
  cy.visit('/#/log-in');
  cy.get('input#username').type('mike.wazowski@example.com');
  cy.get('input#password').type('PasSwOrd', { log: false });
  cy.get('button').contains('Log in').click();
  cy.hash().should('eq', '#/');

  cy.get('button').contains('Log out');
};
describe('Authentication', function () {
  it('Can log in.', function () {
    logIn();
    cy.hash().should('eq', '#/');
  });

  it('Can sign up.', function () {
    cy.visit('/#/sign-up');
    cy.get('input#username').type('gary.cole@example.com');
    cy.get('input#firstName').type('Gary');
    cy.get('input#lastName').type('Cole');
    cy.get('input#password').type('pAssw0rd', { log: false });
    cy.get('select#group').select('driver');
    cy.fixture('images/photo.jpg').then((photo) => {
      cy.get('input#photo').attachFile({
        fileContent: photo,
        fileName: 'photo.jpg',
        mimeType: 'application/json',
      });
    });
    cy.get('button').contains('Sign up').click();
    cy.hash().should('eq', '#/log-in');
  });
  it('Cannot visit the login page when logged in.', function () {
    logIn();
    cy.visit('/#/log-in');
    cy.hash().should('eq', '#/');
  });

  it('Cannot visit the sign up page when logged in.', function () {
    logIn();
    cy.visit('/#/sign-up');
    cy.hash().should('eq', '#/');
  });

  it('Cannot see links when logged in.', function () {
    logIn();
    cy.get('button#signUp').should('not.exist');
    cy.get('button#logIn').should('not.exist');
  });

  it('Can log out.', function () {
    logIn();
    cy.get('button').contains('Log out').click().should(() => {
      expect(window.localStorage.getItem('taxi.auth')).to.be.null;
    });
    cy.get('button').contains('Log out').should('not.exist');
  });
  
});
