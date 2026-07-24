function Sponsored() {
  return (
    <>
      <div className="p-5">
        <div className="hidden sm:block w-full bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl">
          <div className="flex justify-between w-full gap-5 items-center">
            <div className="flex items-start">
              <img
                src="data:image/png;base64,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"
                alt="CompanyLogo"
                className="w-36 object-contain"
              />
            </div>
            <div className="flex items-start">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAbFBMVEX///8Ag8sAfskAesh5s94AgMoAeMdFldKKvuP7/f6gyufY5/Q1is3T5/QbjM8AfMiw0+zl8fkAdMZtqtqHueDe7feYxubA2+/H4fL0+fwwj9CpzumTweTs9PphpdhXoNahxeZFm9SEst4AbcQPnO8eAAAEUElEQVR4nO2a67aqIBCAAx3souGtTPNS7fd/x6NpFxjUztlryz5rzfe3Qb5oYEBarQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAhiFe1sG/wbp2Yf5rYl/p489Tmw5LBsr8c1pjxus+DjEQx8AMYY+OeRgFJ9ehpuUMjJ1RSi2W4L4RgQcSyKNJtvvopc0Wl35nFdGUOY2kXsYvFjrHYv5+eMx9kIIEVxCXAn7+Sh57xayMKY6XtQnisN4luhdf4d8c5dFOXUqO9uUmkO4Boy3YJ4q8K9bKzp5uxJPV7C6XeId6mbmltGjQA9WDLDDLUkzljsGjI3v0jUkrOkTyw13pp42xVaLk61RMPteP1Ct8lSpV974oyXal9tyUHZzWXaT8wofX4F6+LAlRl68jgabuFnvU9YtPUIoH7ZWRRv18VXZ5FryG5Y9wFR89VrcvEcdJviTKyH+E1W6J20P0jTL4LV+ZVC4Li7XyDOWJ/Au5SjBnJ/6SdvVispJL3tkuIAKH87uNtFG0oOi+t+X1CV+owdSsAi4sBlSyzQ7APvsMobvAZyue09AjRjQdT5UuLg3StIfnALZH45C8OkHEpOlcS6tvSG6r+M+GOTFCTIEufQY73OM0/vWbJ0qKKh/snPirdjiNNZhcNtN3xJ0L+l89ibBTf9+/60+Co3z9JX7HUoOaWvZ3dbRYfd8LHAi9BPi+OnaXbNPTa4Oii7iyG7o0L/bBHxik0PuYRtVZVSzyjuu0P70jFl28+L581McQInafBwN0N2h41jbLWAuDs3PRnatYC89Nkd3dhI658X36Sz4jpiP2R3Ziixi4l/MOIqwB57xFovR4uKV9fpyalry+cekZmzeynx6NONY+/jl/0e0XSqW1Z8PTVuOlCfeh/DqW5h8cN0/dHw+0XQdKpbWDzao/3hlA6IZNeek/GpbmHxHK1nvE6n1Z39Be0R789E4tji++JFGLRk28TXh45fVtl+MnvAOCnFVd+PJ4FCZRIP1ZhZ8TZX7zB8AvLb1ofEsGmaRDrrCp1J/HcgNIkrIX7zgfioQXIPD+fWDAXg1wCdgDRio7gC974h/ngLGyUz2/Q32qW9m4dWxZ3k2eIyvg1RAJ70X9aqePz2fn9Xf7LCS3YeXpXaFBfKa+/NOZ5/q9483/BaFJepVjOiZjLTgRfhK9ieuMTXafmlGM90zm7vV0HWxEVtusAKanyTMsR7mfID2RKPE/NdbXVE5+QO+Xw1YVecw3b0qjO4InPgHqrPFsRB+tNX9GvtRMx9fRpbEAcpi9voJedA9v4CF3iNbznnxMU/ihdCmu7yheCFe95NX4h3VOXzveGr5Kgw498FBuRXVyKOXyaLR4goDE9duwbS8nyKqs/+P7EJ2H24IL6OZJWxixfdj5RNh6zND/42aVuNpB/OB/46sis3/fvgP+DwPw43QRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQczxB+6zT5+S7tyoAAAAAElFTkSuQmCC"
                alt="CompanyLogo"
                className="w-36 object-contain"
              />
            </div>
            <div className="flex items-start">
              <img
                src="data:image/jpeg;base64,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"
                alt="CompanyLogo"
                className="w-36 object-contain"
              />
            </div>
            <div className="flex items-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpW1IXstLlQwXxcKKkalP2RRxkw1PNtK8aZMIgcUNLQ&s=10"
                alt="CompanyLogo"
                className="w-36 object-contain"
              />
            </div>
            <div className="flex items-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-03bCytF0Q4N84tBc_-OaX-HYTMJrqb-J6112zD4Qmw&s=10"
                alt="CompanyLogo"
                className="w-36 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sponsored;
