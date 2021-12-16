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

contract("FundraiserFactory: fundraisers", (accounts) => {
  async function createFundrasierFactory(fundraisersCount, accounts) {
    const factory = await FundraiserFactoryContract.new();
    await addFundraisers(factory, fundraisersCount, accounts);
    return factory;
  }

  async function addFundraisers(factory, count, accounts) {
    const name = "Beneficiary";
    const lowerCaseName = name.toLowerCase();
    const beneficiary = accounts[1];

    for(let i=0; i < count; i++){
      await factory.createFundrasier(
        `${name} ${i}`,
        `${lowerCaseName} ${i}.com`,
        `${lowerCaseName} ${i}.png`,
        `Description for ${name} ${i}`,
        beneficiary
      );
    }
  }

  describe("when fundraisers collection is empty", () => {
    it("returns an empty collection", async () => {
      const factory = await createFundrasierFactory(0, accounts);
      const fundraisers = await factory.fundraisers(10, 0);
      assert.equal(
        fundraisers.length,
        0,
        "collection should be empty"
      );
    });
  });
});
