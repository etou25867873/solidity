const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

contract("FundraiserFactory: deployment", () => {
  it("has been deployed", async () => {
    const fundraiserFactory = FundraiserFactoryContract.deployed();
    assert(fundraiserFactory, "fundraiser factory was not deployed");
  });
});

contract("FundraiserFactory: createFundrasier", (accounts) => {
  let fundraiserFactory;
  const name = "Beneficiary Name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekitten.com/600/350";
  const description = "Beneficiary description";
  const beneficiary = accounts[1];

  it ("incrments the fundraisersCount", async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();
    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
    await fundraiserFactory.createFundrasier(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );
    const newFundraisersCount = await fundraiserFactory.fundraisersCount();

    assert(
      newFundraisersCount - currentFundraisersCount,
      1,
      "should incrment by 1"
    );
  });

  it ("emit the FundraiserCreated event", async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();
    const tx = await fundraiserFactory.createFundrasier(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );
    const expectedEvent = "FundraiserCreated";
    const actualEvent = tx.logs[0].event;
    assert.equal(
      actualEvent,
      expectedEvent,
      "events should match"
    )
  });
});
