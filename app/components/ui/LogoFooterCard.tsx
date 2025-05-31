import React from 'react'
import { COLORS } from '../../theme/colors'

function LogoFooterCard() {
  return (
    <div
        className="flex flex-col items-center pb-5"
        style={{
          background: COLORS.secondary,
        }}
      >
        <div className="mb-6">
          <img
            src="/images/logo/ayadaclifflogo-mark.png"
            alt="AYADA CLIFF"
            className="w-42 md:w-[15vw]"
          />
        </div>

        <div
          className="my-4 h-px w-12"
          style={{ backgroundColor: COLORS.primary, opacity: 0.15 }}
        ></div>

        <div className="max-w-md text-center">
          <p
            className="text-xl leading-relaxed font-light"
            style={{ color: COLORS.primary, opacity: 0.7 }}
          >
            An intimate retreat perched on the dramatic cliffs of Varkala, where
            tranquility and natural beauty create an unforgettable sanctuary
          </p>
        </div>
      </div>
  )
}

export default LogoFooterCard