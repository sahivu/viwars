import { BoardCanvas } from "./modules/CanvasRenderer.js";
import { GameProvider } from "./modules/GameLogistics.js";
import { RoomInfo, TCRColour, TPlayer } from "./modules/HelpersNComponents/BoardConstants.js";
import { GameStateSnapshot } from "./modules/Scrap0/main.js";

// Так, GameState с CanvasRender связали +
// Клики от пользователя сделаны +
// Клики переправляем на сервер 
// Далее клики от сервера должны попасть на логику
// Логика должна просчитать допустимый ли это ход и вернуть или новый State, или ошибку 
                // на текущем этапе вставим простую пробку что будет принимать все ходы 
                                //для отладки и разработки удобно, не надо за исправлениями лезть в два файла
                                        //когда Логика будет завершана, скопипастим код на сервер, язык один
// Далее ошибка или state должна попасть к пользователю на рендер

// Со всем согласен?
// Хотя возможность хода можно и на клиенте считать, но лишняя проверка не помешает 
                // помешает // А потом хакер возьмёт и начнёт читерить)
                        //лол, я же грю когда >>Логика будет завершана<<, скопипастим код на сервер, язык один
                        //Ладно, Я пока в логику писать планы//👍🏻

// мы вот кдпишем но не чекали ещё что он рабочий, запуль пока что есть, потом наверно я пробегусь по багам и очепятка
                // я со вчера не спал, так что я наверно отключась
                        // Ок
const players = [new TPlayer('Garet', 'X', '', TCRColour.RED), new TPlayer('Froggis', 'O', '', TCRColour.BLUE)]


export var game = new GameProvider(new RoomInfo({
                            players
                          }), GameStateSnapshot.default([10, 10]));