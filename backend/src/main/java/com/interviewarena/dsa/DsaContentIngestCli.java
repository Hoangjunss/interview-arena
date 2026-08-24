package com.interviewarena.dsa;

import com.interviewarena.InterviewArenaApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import java.nio.file.Path;

public class DsaContentIngestCli {

    public static void main(String[] args) {
        if (args.length < 1) {
            System.err.println("Usage: DsaContentIngestCli <content-dsa-root-dir>");
            System.exit(1);
        }
        var app = new SpringApplicationBuilder(InterviewArenaApplication.class)
            .web(WebApplicationType.NONE);
        try (ConfigurableApplicationContext ctx = app.run(args)) {
            DsaContentIngestService service = ctx.getBean(DsaContentIngestService.class);
            DsaContentIngestService.IngestResult result = service.ingestDirectory(Path.of(args[0]));
            System.out.println("Upserted: " + result.upserted());
            if (!result.errors().isEmpty()) {
                System.err.println("Errors:");
                result.errors().forEach(System.err::println);
                SpringApplication.exit(ctx, () -> 1);
                System.exit(1);
            }
        }
    }
}
