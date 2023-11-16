export const MENU_LIST = {
  'sundae-soup': { name: '해장국🥣', cookTime: 2 },
  'haejang-soup': { name: '순대국🥘', cookTime: 1 },
};

export const CHEF_LIST = {
  chef1: { name: '장금이👨‍🍳' },
  chef2: { name: '백주부👨🏽‍🍳' },
};

export const SERVER_LIST = {
  server1: { name: '👧🏻', runTime: 1 },
  server2: { name: '🤴', runTime: 2 },
};

export const ORDER_STATE = {
  WAITING: '대기중',
  COOKING: '요리중',
  COOKED: '대기중',
  SERVING: '서빙중',
  DONE: '완료',
};

export const CHEF_STATE = {
  WAITING: '대기',
  COOKING: '요리중',
  DONE: '완료',
};

export const SERVER_STATE = {
  WAITING: '대기',
  SERVING: '서빙중',
  DONE: '완료',
};
