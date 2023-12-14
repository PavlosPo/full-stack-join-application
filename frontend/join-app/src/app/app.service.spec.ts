import { TestBed } from "@angular/core/testing";

import { AppService } from "./app.service";

describe("AppService", () => {
  let service: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppService]
    }).compileComponents();
    service = TestBed.inject(AppService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
