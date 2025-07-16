export default function FeatureCard(){
    return (
        <>
            <section className="features my-6">
                <div className="container">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="card bg-[#f6f4f5] py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
                            <div className="icn">
                                <img className="w-[40px] h-[40px] object-contain" src="/media/icons/quality.png" alt="quality" />
                            </div>
                            <div className="text mt-2">
                                <span className="inline-block text-base font-medium">Best Quality Assured</span>
                            </div>
                        </div>
                        <div className="card bg-[#f6f4f5] py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
                            <div className="icn">
                                <img className="w-[40px] h-[40px] object-contain" src="/media/icons/delivery-van.png" alt="quality" />
                            </div>
                            <div className="text mt-2">
                                <span className="inline-block text-base font-medium">    Timely Delivery</span>
                            </div>
                        </div>
                        <div className="card bg-[#f6f4f5] py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
                            <div className="icn">
                                <img className="w-[40px] h-[40px] object-contain" src="/media/icons/customer-satisfaction.png" alt="quality" />
                            </div>
                            <div className="text mt-2">
                                <span className="inline-block text-base font-medium">Customer Satisfaction</span>
                            </div>
                        </div>
                        <div className="card bg-[#f6f4f5] py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
                            <div className="icn">
                                <img className="w-[40px] h-[40px] object-contain" src="/media/icons/euro-price.png" alt="quality" />
                            </div>
                            <div className="text mt-2">
                                <span className="inline-block text-base font-medium">Reasonable Price</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}