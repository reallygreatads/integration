export const renderTemplateCard = ({ adverts }) => {
  if (adverts.length === 0) {
    return `
      <div id="rga_ad-wrapper">
        <div class="rga_card-ad-wrap"></div>
      </div>
    `;
  }

  return `
    <div id="rga_ad-wrapper">
      <div class="rga_card-ad-wrap">

        ${adverts
          .map((advert, index) => {
            return `
            <article class="rga_card-ad-template ${
              adverts?.length === 2 && index === 0
                ? "rga_card-ad-template--offset-2"
                : adverts?.length === 1 && index === 0
                ? "rga_card-ad-template--offset-3"
                : ""
            }">
              <h2 class="rga_card-ad-template__title">
                ${advert.title}
              </h2>

              <div class="rga_card-ad-template__image-wrap">
                ${
                  advert.image_url &&
                  `
                  <img
                    src="${advert.image_url}"
                    alt=""
                    class="rga_card-ad-template__image"
                  />
                `
                }
              </div>

              <div class="rga_card-ad-template__content">
                <div class="rga_card-ad-template__body">
                  ${
                    advert.description?.length > 1
                      ? `
                      <ul class="rga_card-ad-template__list">
                        ${advert.description
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                      </ul>
                    `
                      : advert.description[0]
                  }
                </div>
              </div>

              <a href="${advert.click_url}" class="rga_card-ad-template__cta">${
              advert.cta_text
            }</a>
            </article>
          `;
          })
          .join("")}
      </div>
    </div>
  `;
};
