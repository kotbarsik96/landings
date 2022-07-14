<template>
   <main>
      <section class="start-block">
         <div class="start-bg__black"></div>
         <div
            class="start-bg__image"
            :style="`background-image: url('${rootPath}images/backgrounds/categories/offroad.jpg')`"
         ></div>
         <div class="start-block__wrapper">
            <div class="start-block__container container series-block__container">
               <div class="series-block__bike bike-block">
                  <div
                     class="bike-block__container"
                     :style="`background-image: url('${rootPath}images/backgrounds/categories/offroad.jpg')`"
                  >
                     <img :src="`${rootPath}images/bicycles/streetster-nathan/white.png`" alt="Streetster Bike" />
                  </div>
               </div>
               <div class="series-block__info info-block">
                  <div class="info-block__header h1">Что такое Streester?</div>
                  <div class="info-block__text">
                     <p>Велосипе́д (стар. фр. vélocipède, от лат. vēlōx «быстрый» и pes «нога») — колёсное транспортное средство (или спортивный снаряд), приводимое в движение мускульной силой человека через ножные педали или (крайне редко) через ручные рычаги. Наиболее распространены двухколёсные велосипеды, но существуют также конструкции с тремя и более колёсами. Стал использоваться как средство передвижения ещё до широкого распространения городского общественного транспорта, в том числе автобусов, троллейбусов и трамваев. Также популярен среди туристов и в спортивных целях. В современном мире также используют электропривод для увеличения области использования велосипеда.</p>
                     <p>
                        В 1817 году немецкий профессор барон Карл фон Дрез из Карлсруэ создал, а в 1818 году запатентовал первый двухколёсный самокат, который он назвал „машиной для бега“ (Laufmaschine). Самокат Дреза был двухколёсным, снабжён рулём и выглядел в целом, как велосипед без педалей; рама была деревянной.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section class="contacts">
         <div class="contacts__container container">
            <div class="contacts__title h1" id="contacts-page">Контакты</div>
            <div class="contacts__main">
               <div class="contacts__numbers">
                  <div class="numbers__item">
                     <div class="numbers__title h2">Консультации и заказ по телефонам</div>
                     <div class="numbers__info">
                        <div class="numbers__phones">
                           <p class="numbers__phone-item">
                              <a href="tel:88005553535">+7-800-555-35-35</a>
                           </p>
                           <p class="numbers__phone-item">
                              <a href="tel:88005553535">+7-800-555-35-35</a>
                           </p>
                        </div>
                        <div class="numbers__schedule">
                           <div class="numbers__schedule-title h3">График работы</div>
                           <div class="numbers__schedule-info">
                              <div class="schedule-info__days">
                                 <p>В будни</p>
                                 <p>Суббота</p>
                                 <p>Воскресенье</p>
                              </div>
                              <div class="schedule-info__time">
                                 <p>с 08:00 до 21:00</p>
                                 <p>с 09:00 до 20:00</p>
                                 <p>с 10:00 до 19:00</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="numbers__item">
                     <div class="numbers__title h2">Сервисный отдел</div>
                     <div class="numbers__info">
                        <div class="numbers__phones">
                           <p class="numbers__phone-item">
                              <a href="tel:88005553535">+7-800-555-35-35</a>
                           </p>
                           <p class="numbers__phone-item">
                              <a href="tel:88005553535">+7-800-555-35-35</a>
                           </p>
                        </div>
                        <div class="numbers__schedule">
                           <div class="numbers__schedule-title h3">График работы</div>
                           <div class="numbers__schedule-info">
                              <div class="schedule-info__days">
                                 <p>В будни</p>
                                 <p>Суббота</p>
                                 <p>Воскресенье</p>
                              </div>
                              <div class="schedule-info__time">
                                 <p>с 08:00 до 21:00</p>
                                 <p>с 09:00 до 20:00</p>
                                 <p>с 10:00 до 19:00</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="numbers__item">
                     <div class="numbers__title h2">Эксперты на связи</div>
                     <div class="numbers__info">
                        <div class="numbers__phones">
                           <p class="numbers__phone-item">
                              <a href="tel:88005553535">+7-800-555-35-35</a>
                           </p>
                           <p class="numbers__phone-item">
                              <a href="tel:88005553535">+7-800-555-35-35</a>
                           </p>
                        </div>
                        <div class="numbers__schedule">
                           <div class="numbers__schedule-title h3">График работы</div>
                           <div class="numbers__schedule-info">
                              <div class="schedule-info__days">
                                 <p>В будни</p>
                                 <p>Суббота</p>
                                 <p>Воскресенье</p>
                              </div>
                              <div class="schedule-info__time">
                                 <p>с 08:00 до 21:00</p>
                                 <p>с 09:00 до 20:00</p>
                                 <p>с 10:00 до 19:00</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="contacts__image contacts-image">
                  <div
                     class="contacts-image__container"
                     :style="`background-image: url('${rootPath}images/backgrounds/categories/offroad.jpg')`"
                  >
                     <img :src="`${rootPath}images/bicycles/streetster-nathan/grey.png`" alt="Streetster Bike" />
                  </div>
               </div>
            </div>
            <div class="contacts__adds">
               <div class="h2">Пункты самовывоза и возврата</div>
               <p
                  class="contacts__adds-item"
               >Вернуть товар можно в сервисных отделах или в пунктах приема возвратов.</p>
               <p
                  class="contacts__adds-item"
               >Пункты приема возвратов не имеют сервисных специалистов. Окончательное решение по возврату товара будет принято после осмотра товара специалистом сервиса.</p>
            </div>
         </div>
      </section>
   </main>
</template>

<script>
import rootPath from "@/root-path.js";

export default {
    name: "ContactsPage",
    data(){
      return {
         rootPath
      }
    }
};
</script>