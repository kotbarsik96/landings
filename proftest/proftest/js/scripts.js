const quiz = [
    {
        title: "Работа, связанная с учетом и контролем, – это довольно скучно."
    },
    {
        title: "Я предпочту заниматься финансовыми операциями, а не, например, музыкой."
    },
    {
        title: "Невозможно точно рассчитать, сколько времени уйдет на дорогу до работы, по крайней мере, мне."
    },
    {
        title: "Я часто рискую."
    },
    {
        title: "Меня раздражает беспорядок."
    },
    {
        title: "Я охотно почитал(а) бы на досуге о последних достижениях в различных областях науки."
    },
    {
        title: "Записи, которые я делаю, не очень хорошо структурированы и организованы."
    },
    {
        title: "Я предпочитаю разумно распределять деньги, а не тратить все сразу."
    },
    {
        title: "У меня наблюдается, скорее, рабочий беспорядок на столе, чем расположение вещей по аккуратным «стопочкам»."
    },
    {
        title: "Меня привлекает работа, где необходимо действовать согласно инструкции или четко заданному алгоритму."
    },
    {
        title: "Если бы я что-то собирал(а), я бы постарался(ась) привести в порядок коллекцию, все разложить по папочкам и полочкам."
    },
    {
        title: "Терпеть не могу наводить порядок и систематизировать что бы то ни было."
    },
    {
        title: "Мне нравится работать на компьютере – оформлять или просто набирать тексты, производить расчеты."
    },
    {
        title: "Прежде чем действовать, надо продумать все детали."
    },
    {
        title: "На мой взгляд, графики и таблицы – очень удобный и информативный способ представления информации."
    },
    {
        title: "Мне нравятся игры, в которых я могу точно рассчитать шансы на успех и сделать осторожный, но точный ход."
    },
    {
        title: "При изучении иностранного языка я предпочитаю начинать с грамматики, а не получать разговорный опыт без знания грамматических основ."
    },
    {
        title: "Сталкиваясь с какой-либо проблемой, я пытаюсь всесторонне ее изучить (ознакомиться с соответствующей литературой, поискать нужную информацию в Интернете, поговорить со специалистами)."
    },
    {
        title: "Если я выражаю свои мысли на бумаге, мне важнее...",
        answers: [
            "Логичность теста",
            "Затрудняюсь ответить",
            "Образность изложения"
        ]
    },
    {
        title: "У меня есть ежедневник, в который я записываю важную информацию на несколько дней вперед."
    },
    {
        title: "Я с удовольствием смотрю новости политики и экономики."
    },
    {
        title: "Я бы хотел(а), чтобы моя будущая профессия:",
        answers: [
            "Обеспечивала меня нужной порцией адреналина",
            "Затрудняюсь ответить",
            "Давала бы мне ощущение спокойствия и надежности"
        ]
    },
    {
        title: "Я доделываю работу в последний момент."
    },
    {
        title: "Взяв книгу, я всегда ставлю ее на место."
    },
    {
        title: "Когда я ложусь спать, то уже наверняка знаю, что буду делать завтра."
    },
    {
        title: "В своих словах и поступках я следую пословице «Семь раз отмерь, один – отрежь»."
    },
    {
        title: "Перед ответственными делами я всегда составляю план их выполнения."
    },
    {
        title: "После вечеринки мытье посуды я откладываю до утра."
    },
    {
        title: "Я серьезно отношусь к своему здоровью."
    },
    {
        title: "Когда у меня что-то не получается, я...",
        answers: [
            "Терпеливо стараюсь найти решение",
            "Затрудняюсь ответить",
            "Начинаю нервничать и злиться"
        ]
    }
];

const results = [
    // если везде отвечать первый вариант
    {
        id: "nature-man",
        title: "Человек-природа",
        description: "Вы показали повышенный интерес к знаковым системам – это условные знаки, цифры, коды, естественные и искусственные языки. Вы могли бы связать свою профессиональную деятельность с непосредственным отношением к самой развитой и всеохватывающей системе знаков – языку, работая со словами, книгами и текстами. Способность преобразовывать область реального производства в область чисел позволяет присвоить всему количественную меру либо провести научные исследования в области химии или биологии, пытаясь добыть необходимую информацию об окружающей среде. Для выполнения профессиональных задач необходимо обладать такими качествами как: терпение, организованность, аккуратность, а так же уметь принимать нестандартные решения для достижения результатов. Кроме того, при наличии других более выраженных интересов, работа со знаковыми системами может быть лишь частью другой, основной профессии или деятельности, направленной на системы условных знаков и схематические отображения объектов (садово-парковое и ландшафтное строительство, рациональное использование природохозяйственных комплексов)."
    },
    // если везде отвечать последний вариант
    {
        id: "man-man",
        title: "Человек-человек",
        description: "Вам не очень интересно то, что предполагает работу с документами, знаками, цифрами, текстами, бумагами. Скорее всего, Вы относитесь к людям более-менее творческим, не любящим работу по алгоритму, монотонную, связанную с обработкой архивов, документов и расчетами. Сферы деятельности, где требуется точность, оперативность, аккуратность, дисциплинированность, ответственность (инженер, юрист, экономист, программист), скорее всего, покажутся вам сухими, скучными и потребуют большого напряжения. Ваша склонность к импровизации, нестандартности, нерегламентированности может быть уместна для представителей творческих профессий, деятелей сферы искусств, а также при работе в условиях неопределенности, частых командировок и т.д. (гостиничный сервис, товароведение и экспертиза качества потребительских товаров, реклама, психология, преподавание и т.д.)."
    },
    // если везде отвечать два первых варианта сверху и два последних варианта снизу
    {
        id: "man-tech",
        title: "Человек-техника",
        description: "Вы показали некоторый интерес к знаковым системам. Этот интерес объединяет профессии, связанные с текстами (упорядочение, ведение записей, поиск, анализ и переработка информации, накопление и хранение разного рода сведений) или цифрами, формулами, таблицами, чертежами, схемами (схематизация, расчеты). А также склонность к техническим наукам, умение работать по заданному алгоритму. Вы способны аккуратно и точно выполнять работу, при необходимости – дисциплинированы, оперативны. Но при этом сохраняете гибкость и мобильность. Главное – это Ваше терпимое отношение к кажущейся многим скучной и монотонной работе с цифрами и схемами. Но этот интерес не настолько велик, чтобы однозначно запирать себя в мир знаков. Подумайте, может быть, знаковые системы «суховаты» для Вас? При выборе профессии рекомендуем ориентироваться на другие, более ярко выраженные Ваши интересы (мастер столярно-плотничных и паркетных работ; конструирование, моделирование и технология швейных изделий)."
    },
    // если последних вариантов (3) чуть больше, чем первых
    {
        id: "man-art",
        title: "Человек-художественный образ",
        description: "Вам совершенно неинтересно все, что предполагает работу с документами, знаками, цифрами, текстами, бумагами. Вы больше цените в жизни сюрпризы и импровизацию. Скорее всего, вы относитесь к людям творческим. Вам вряд ли подойдет профессиональная деятельность, связанная с четким выполнением инструкций. Изобразительное искусство, музыка, театральная деятельность, возможность импровизации – неотъемлемая составляющая Вашей профессиональной направленности (дизайнер, парикмахер, актер, художник). Однако Вы не всегда можете заставить себя делать то, что «надо», вместо того, что «хочется». Это может создать сложности при трудоустройстве, ведь практически любая работа предполагает правила и обязательства. Рекомендуем Вам развивать в себе волевые качества, умение планировать, дисциплинированность."
    },
    // по умолчанию
    {
        id: "man-signsystem",
        title: "Человек-знаковая система",
        description: "Вы показали высокий интерес к знаковым системам – это условные знаки, цифры, коды, естественные и искусственные языки. Вы могли бы найти себя в профессиях, связанных с исследованием истории возникновения языков, редактированием текстов, созданием и ведением библиотек, каталогов, баз данных. Данные навыки представлены в профессиях: корректор, технический редактор, таможенный декларант, нотариус и др. Вы можете рассматривать профессиональную деятельность, включающую обработку цифровой информации и количественных соотношений (экономист, программист, бухгалтер, статистик, демограф, математик, контролер банка). Вам интересна кажущаяся многим скучной и монотонной работа с бумагами, цифрами, буквами, документами – организация, упорядочивание, анализ, контроль и пр. Вы принимаете решение, тщательно рассмотрев ситуацию и взвесив альтернативы, что делает Вас незаменимым в бизнесе, управлении, науках. Однако с Вашим самоконтролем, Вам не хватает непосредственности (и даже импульсивности), необходимой представителям сферы искусства. Кроме того, могут возникать трудности из-за неумения расслабляться, поэтому Вам стоит развивать гибкость в поведении, умение менять свои планы при необходимости, не требовать от себя и окружающих безупречности."
    }
];

class Quiz {
    constructor(quizBlock) {
        this.startQuiz = this.startQuiz.bind(this);
        this.goNext = this.goNext.bind(this);

        this.rootElem = quizBlock;
        this.quizItemsOnPage = 4;
        this.startButton = this.rootElem.querySelector("#start-button");
        this.transitionDur = 350;
        this.pagesTotal = Math.ceil(quiz.length / this.quizItemsOnPage);

        this.startButton.addEventListener("click", this.startQuiz);
    }
    startQuiz() {
        this.renderQuiz(1);
        const startCont = this.rootElem.querySelector(".quiz-container__start");
        startCont.style.transition = `all ${this.transitionDur / 1000}s`;
        setTimeout(() => {
            startCont.style.opacity = "0";
            setTimeout(() => {
                startCont.remove();
                this.insertNewQuiz();
            }, this.transitionDur);
        }, 50);
        this.page = 1;
    }
    goNext() {
        if (
            (this.answeredQuestions && this.answeredQuestions.length === this.quizItemsOnPage * this.page)
        ) {
            this.page++;
            this.renderQuiz(this.page);
            this.removeOldQuiz();

            const fmNode = this.rootElem.querySelector(".failed-message");
            if (fmNode) {
                fmNode.style.cssText = `opacity: 0; transition: all ${this.transitionDur / 1000}s;`;
                setTimeout(() => fmNode.remove(), this.transitionDur);
            }
        } else if (this.answeredQuestions.length === quiz.length) {
            this.showResults();
        } else {
            if (this.rootElem.querySelector(".failed-message")) return;

            const failedMessage = `
                <p class="failed-message" style="opacity: 0; transition: all ${this.transitionDur / 1000}s;">Чтобы продолжить, пожалуйста, ответьте на все вопросы</p>
            `;
            this.rootElem.insertAdjacentHTML("beforeend", failedMessage);
            setTimeout(() => {
                const fmNode = this.rootElem.querySelector(".failed-message");
                fmNode.style.opacity = "1";
                setTimeout(() => fmNode.style.removeProperty("transition"), this.transitionDur);
            }, 50);
        }
    }
    renderQuiz(page) {
        let quizItems = ``;
        const start = page * this.quizItemsOnPage - this.quizItemsOnPage;
        for (let i = start; i < start + this.quizItemsOnPage; i++) {
            const quizItem = quiz[i];
            if (!quizItem) break;

            let answers = ``;
            if (quizItem.answers) {
                quizItem.answers.forEach((answer, aIndex) => {
                    answers += `
                    <li class="quiz-item__answer-item">
                        <input id="quiz-question-${i + 1}_${aIndex + 1}" type="radio" name="quiz_question-${i + 1}"
                            class="quiz-item__answer-input">
                        <label for="quiz-question-${i + 1}_${aIndex + 1}" class="quiz-item__answer-label">
                            <span class="quiz-item__answer-checkbox static-icon-checkmark"></span>
                            <span class="quiz-item__answer-text">
                                ${answer}
                            </span>
                        </label>
                    </li>
                    `;
                });
            } else {
                answers = `
                <li class="quiz-item__answer-item">
                    <input id="quiz-question-${i + 1}_1" type="radio" name="quiz_question-${i + 1}"
                        class="quiz-item__answer-input">
                    <label for="quiz-question-${i + 1}_1" class="quiz-item__answer-label">
                        <span class="quiz-item__answer-checkbox static-icon-checkmark"></span>
                        <span class="quiz-item__answer-text">
                            Да
                        </span>
                    </label>
                </li>
                <li class="quiz-item__answer-item">
                    <input id="quiz-question-${i + 1}_2" type="radio" name="quiz_question-${i + 1}"
                        class="quiz-item__answer-input">
                    <label for="quiz-question-${i + 1}_2" class="quiz-item__answer-label">
                        <span class="quiz-item__answer-checkbox static-icon-checkmark"></span>
                        <span class="quiz-item__answer-text">
                            Затрудняюсь ответить
                        </span>
                    </label>
                </li>
                <li class="quiz-item__answer-item">
                    <input id="quiz-question-${i + 1}_3" type="radio" name="quiz_question-${i + 1}"
                        class="quiz-item__answer-input">
                    <label for="quiz-question-${i + 1}_3" class="quiz-item__answer-label">
                        <span class="quiz-item__answer-checkbox static-icon-checkmark"></span>
                        <span class="quiz-item__answer-text">
                            Нет
                        </span>
                    </label>
                </li>
                `;
            }

            quizItems += `
            <li class="quiz__item">
                <h2 class="quiz__item-title">
                    ${quizItem.title}
                </h2>
                <ul class="quiz__item-answers">
                    ${answers}
                </ul>
            </li>
            `;
        }

        this.quizBlockInner = `
        <ul class="quiz" style="opacity: 0; transition: all ${this.transitionDur / 1000}s;">
            ${quizItems}
        </ul>
        `;
    }
    removeOldQuiz() {
        const quizList = this.rootElem.querySelector(".quiz");
        quizList.style.transition = `all ${this.transitionDur / 1000}s`;
        setTimeout(() => {
            quizList.style.opacity = "0";
            setTimeout(() => {
                quizList.remove();
                this.insertNewQuiz();
            }, this.transitionDur);
        }, 50);
    }
    insertNewQuiz() {
        this.rootElem.insertAdjacentHTML("afterbegin", this.quizBlockInner);
        const quizList = this.rootElem.querySelector(".quiz");
        setTimeout(() => quizList.style.opacity = "1", 50);
        setTimeout(() => {
            quizList.style.removeProperty("transition");
        }, this.transitionDur);

        if (!this.rootElem.querySelector("#quiz-next")) {
            const btn = `
            <div class="button-container" style="opacity: 0; transition: all ${this.transitionDur / 1000}s;">
                <button class="button" id="quiz-next">
                    ДАЛЬШЕ
                </button>
            </div>
            `;
            this.rootElem.insertAdjacentHTML("beforeend", btn);
            setTimeout(() => {
                const btnNode = this.rootElem.querySelector("#quiz-next").parentNode;
                btnNode.style.opacity = "1";
                setTimeout(() => {
                    btnNode.style.removeProperty("transition");
                }, this.transitionDur);
            }, 50);
            this.rootElem.querySelector("#quiz-next").addEventListener("click", this.goNext);
        }

        const quizItems = this.rootElem.querySelectorAll(".quiz__item");
        quizItems.forEach(qi => {
            qi.addEventListener("change", (event) => {
                const name = event.target.name;
                if (!this.answeredQuestions) this.answeredQuestions = [];
                const isAnswered = this.answeredQuestions.find(answQt => answQt.name === name);
                if (isAnswered) return;

                this.answeredQuestions.push({ name, input: event.target });
            });
        });
    }
    showResults() {
        filterArray = filterArray.bind(this);

        const firstAnswersPart = filterArray("_1").length / (quiz.length / 100);
        const secondAnswersPart = filterArray("_2").length / (quiz.length / 100);
        const thirdAnswersPart = filterArray("_3").length / (quiz.length / 100);

        if (secondAnswersPart >= 50) redirect("noresult/index.html");
        else if (firstAnswersPart >= 75) redirect("result/nature-man/index.html");
        else if (thirdAnswersPart >= 75) redirect("result/man-man/index.html");
        else if (firstAnswersPart >= 60) redirect("result/man-signsystem/index.html");
        else if (thirdAnswersPart >= 60) redirect("result/man-tech/index.html");
        else redirect("result/man-art/index.html");

        function filterArray(incl) {
            return this.answeredQuestions.filter(aq => {
                return aq.input.getAttribute("id").includes(incl);
            });
        }
        function redirect(pageName) {
            const link = document.createElement("a");
            link.setAttribute("href", pageName);
            link.click();
        }
    }
}

new Quiz(document.querySelector(".quiz-container"));