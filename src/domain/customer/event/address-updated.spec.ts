import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import AddressUpdatedEvent from "./address-updated.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";

describe("Address updated events tests", () => {
  
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    const addressUpdatedEvent = new AddressUpdatedEvent({
      name: "Address 1",
      id: "123",
      address: "Rua 1, 123, Curitiba, 12456-000"
    });

    eventDispatcher.notify(addressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
