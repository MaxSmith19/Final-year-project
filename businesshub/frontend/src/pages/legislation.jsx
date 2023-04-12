const Legislation = () =>{

    return(
        <div className="xl:grid lg:grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-rows-3 xl:grid-cols-3">
      <div className="bg-white h-full w-10/12 m-auto rounded-xl shadow-2xl p-6 text-left text-xl">
        <h1 className="text-5xl mb-4">Personal Allowance</h1>
        <hr className="border-gray-400 mb-4" />
        <p className="mb-4">Personal allowance is a tax-free amount of money provided by the government each year. It represents the amount of income you're entitled to before you need to start paying taxes.</p>
        <p className="mb-4">In the current tax year, the personal allowance is set at £12,570. This means that if your total income is less than this amount, you won't need to pay any taxes on it. However, if your income exceeds this threshold, you will be required to pay taxes on the amount above the personal allowance.</p>
      </div>
      <div className="bg-white h-full w-10/12 m-auto rounded-xl shadow-2xl p-6">
        <h1 className="text-5xl mb-4">Income Tax</h1>
        <hr className="border-gray-400 mb-4" />
        <p className="mb-4">Income tax is a tax on the income you earn during a tax year. The amount of income tax you pay depends on how much you earn and the tax bands you fall into.</p>
        <p className="mb-4">For the current tax year (2022/23), the income tax rates and thresholds for the UK are as follows:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Personal Allowance: £12,570</li>
          <li>Basic Rate (20%): £12,571 - £50,270</li>
          <li>Higher Rate (40%): £50,271 - £150,000</li>
          <li>Additional Rate (45%): Over £150,000</li>
        </ul>
        <p>Use an online tax calculator to estimate how much income tax you'll need to pay based on your income and circumstances.</p>
      </div>

  
        <div className="bg-white w-10/12 m-auto rounded-xl shadow-2xl h-64 sm:h-auto md:w-full p-6 text-left text-xl">
          <h1 className="text-5xl mb-6">VAT</h1>
          <hr className="border-gray-400 mb-6" />
          <p className="mb-4">Value Added Tax (VAT) is a tax on the value added to goods and services at each stage of production or distribution. The standard rate of VAT in the UK is currently 20%, but there are also reduced rates (5% and 0%) and exemptions for certain goods and services.</p>
          <p className="mb-4">If you're a business registered for VAT, you'll need to charge VAT on your sales, and you can reclaim VAT on your purchases. However, if you're not registered for VAT, you can't charge VAT on your sales or reclaim VAT on your purchases.</p>
          <p>To register for VAT or find out more about VAT rules and rates, visit the HMRC website.</p>
        </div>

        <div className="col-span-3 bg-white rounded-xl m-auto shadow-2xl h-56 sm:h-auto md:w-full p-6 text-left text-xl w-11/12"> 
        <h1 className="text-5xl mb-4">Relevant Links</h1>
        <hr className="border-gray-400 mb-4" />
        <ul className="list-disc ml-8 mb-4">
            <li><a className="rLinks" href="https://www.gov.uk/income-tax">Income Tax Information (Gov.uk)</a></li>
            <li><a className="rLinks" href="https://www.gov.uk/vat-businesses">VAT Information for Businesses (Gov.uk)</a></li>
            <li><a className="rLinks" href="https://www.tax.service.gov.uk/calculators">HMRC Tax Calculators</a></li>
            <li><a className="rLinks" href="https://www.gov.uk/self-assessment-tax-returns">Self Assessment Tax Returns (Gov.uk)</a></li>
        </ul>
        <p>These links provide more information and resources to help you understand and manage your taxes.</p>
        </div>

    </div>
        )
}
export default Legislation