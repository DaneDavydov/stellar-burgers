const bunId = '643d69a5c3f7b9001cfa093d';
const sauceId = '643d69a5c3f7b9001cfa0943';
const mainId = '643d69a5c3f7b9001cfa093e';

const orderResponse = {
  success: true,
  name: 'Space флюоресцентный люминесцентный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ],
    _id: '66fd5f5107cc0b001c1d5585',
    owner: {
      name: 'dds',
      email: 'dds@mail.ru',
      createdAt: '2024-10-02T14:46:50.252Z',
      updatedAt: '2024-10-02T14:46:50.252Z'
    },
    status: 'done',
    name: 'Space флюоресцентный люминесцентный бургер',
    createdAt: '2024-10-02T14:57:21.431Z',
    updatedAt: '2024-10-02T14:57:22.217Z',
    number: 54846,
    price: 3044
  }
};

describe('тесты', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/auth/login', {
      fixture: 'login.json'
    });
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');
    cy.setCookie(
      'accessToken',
      `Bearer 20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQ1Y2RhMDdjYzBiMDAxYzFkNTU3ZCIsImlhdCI6MTcyNzg4MDQxMCwiZXhwIjoxNzI3ODgxNjEwfQ.S_YZAsqNnoMtGj6e9ewx-sfZWJPaPsZnH7Cpp28RY7s`
    );
    window.localStorage.setItem(
      'refreshToken',
      '004d350895fa943a7992e31a70b60f8cedebc0316d6a7e4f32df84c8a107ee268317b1fd774d98ab'
    );
    cy.visit('/');
    cy.get(`[data-cy=ingredient-${bunId}]`).as('bun');
    cy.get(`[data-cy=ingredient-${mainId}]`).as('main');
    cy.get(`[data-cy=ingredient-${sauceId}]`).as('sauce');
    cy.get('@bun').find('button').as('bunBtn');
    cy.get('@main').find('button').as('mainBtn');
    cy.get('@sauce').find('button').as('sauceBtn');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Тест получения ингридиентов', () => {
    it('Запрос на получение ингридиенитов с успешым результатом', () => {
      cy.get('@bun').should('contain', 'Флюоресцентная булка R2-D3');
      cy.get('@main').should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );
      cy.get('@sauce').should('contain', 'Соус фирменный Space Sauce');
    });
  });

  describe('Тест на добавление ингридиентов', () => {
    it('Проверка добавления ингридиентов в заказ', () => {
      cy.get('@bunBtn').click();
      cy.get('@mainBtn').click();
      cy.get('@sauceBtn').click();
      cy.get(`[data-cy="bun-top-place-${bunId}"]`).should('exist');
      cy.get(`[data-cy="bun-bottom-place-${bunId}"]`).should('exist');
      cy.get(`[data-cy="ingredient-place-${mainId}"]`).should('exist');
      cy.get(`[data-cy="ingredient-place-${sauceId}"]`).should('exist');
    });
  });

  describe('Тест ингридиентов в модальном окне', () => {
    it('должно отрываться модально окно с описанием ингридиента', () => {
      cy.get('@bun').click();
      cy.location('pathname').should('eq', `/ingredients/${bunId}`);
      cy.get(`[data-cy="ingredient-details-${bunId}"]`).as(
        'bun-modal-ingredient'
      );
      cy.get('@bun-modal-ingredient').should('exist');
      cy.get('@bun-modal-ingredient')
        .find('h3')
        .should('contain', 'Флюоресцентная булка R2-D3');
    });

    it('проверка закрытия модального окна по нажатию на кресик', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modal-close"]').click();
      cy.location('pathname').should('eq', '/');
    });

    it('проверка закрытия модального окна при клике на оверлей', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('Тест оформления заказа', () => {
    it('проверка на создание заказа и его проверка', () => {
      cy.get('@bunBtn').click();
      cy.get('@mainBtn').click();
      cy.get('@sauceBtn').click();
      cy.get('[data-cy="order-button"]').click();
      cy.get('@createOrder')
        .wait('@createOrder')
        .then((intercept) => {
          expect(intercept.response?.statusCode).to.eq(200);
          expect(intercept.response?.body).to.deep.eq(orderResponse);
        });
      cy.get('[data-cy="modal-order-title"]').should('contain', '54846');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal-overlay"]').should('not.exist');
      cy.get('[data-cy="burger-constructor"]')
        .find('div')
        .should('contain', 'Выберите булки');
      cy.get('[data-cy="burger-constructor"]')
        .find('ul')
        .find('div')
        .should('contain', 'Выберите начинку');
    });
  });
});
