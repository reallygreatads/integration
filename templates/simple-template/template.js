export const renderSimpleTemplate = ({ adverts }) => {
  if (adverts.length === 0) {
    return `
      <div id="rga_ad-wrapper">
        <div class="rga_simple-ad-wrap"></div>
      </div>
    `;
  }

  return `
    <div id="rga_ad-wrapper">
      <div class="rga_simple-ad-wrap">

        ${adverts
          .map((advert) => {
            return `
            <article class="rga_simple-ad-template">
              <h2 class="rga_simple-ad-template__title rga_simple-ad-template__title--mobile">
                ${advert.title}
              </h2>

              <div class="rga_simple-ad-template__image-wrap">
                ${
                  advert.image_url &&
                  `
                  <img
                    src="${advert.image_url}"
                    alt=""
                    class="rga_simple-ad-template__image"
                  />
                `
                }
              </div>

              <div class="rga_simple-ad-template__content">
                <h3
                  class="rga_simple-ad-template__title rga_simple-ad-template__title--desktop"
                >
                  ${advert.title}
                </h3>

                <div class="rga_simple-ad-template__body">
                  ${
                    advert.description?.length > 1
                      ? `
                      <ul class="rga_simple-ad-template__list">
                        ${advert.description
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                      </ul>
                    `
                      : advert.description[0]
                  }
                </div>
              </div>

              <a href="${
                advert.click_url
              }" class="rga_simple-ad-template__cta">${advert.cta_text}</a>
            </article>
          `;
          })
          .join("")}
      </div>
    </div>
  `;
};
