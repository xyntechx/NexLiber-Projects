import { aliases } from "@/data/ceramic";
import ceramicService from "@/services/ceramic";
import { useStore } from "@/store/useStore";
import produce from "immer";
import { useCallback, useEffect, useState } from "react";

type journal = { id: string; title: string; body: string; createdAt: number };

interface JournalDoc {
  data: journal[];
}

const modelDefinition = "slate";

export function useGetJournals() {
  const [journals, setJournals] = useState<journal[] | undefined>();
  const [error, setError] = useState<unknown>();

  const { store } = ceramicService();
  const ceramic = useStore((state) => state.ceramic!);

  useEffect(() => {
    (async () => {
      try {
        const dataStore = store(ceramic, aliases);
        const doc = (await dataStore.get("slate")) as JournalDoc;
        setJournals(doc.data);
      } catch (e) {
        e instanceof Error && alert(e.message);
        console.log(e);
        setError(e);
      }
    })();
  }, [ceramic]);

  return { journals, error };
}

export function useGetJournalById(id: string) {
  const [journal, setJournal] = useState<journal | undefined>();
  const [error, setError] = useState<unknown>();

  const { store } = ceramicService();
  const ceramic = useStore((state) => state.ceramic!);

  useEffect(() => {
    (async () => {
      try {
        const dataStore = store(ceramic, aliases);
        const doc = (await dataStore.get(modelDefinition)) as JournalDoc;
        setJournal(doc.data.find((x) => x.id === id));
      } catch (e) {
        e instanceof Error && alert(e.message);
        setError(e);
      }
    })();
  }, [ceramic]);

  return { journal, error };
}

export function useSetJournal() {
  const [success, setSuccess] = useState<boolean | undefined>();
  const [error, setError] = useState<unknown>();

  const { store } = ceramicService();
  const ceramic = useStore((state) => state.ceramic!);

  const saveJournal = useCallback(
    async (journal: journal) => {
      try {
        const dataStore = store(ceramic, aliases);
        const doc = (await dataStore.get(modelDefinition)) as JournalDoc;
        const updatedDocObj = produce(doc, (draft) => {
          const index = draft.data.findIndex((j) => j.id === journal.id);
          if (index !== -1) {
            draft.data[index] = journal;
          } else {
            draft.data.push(journal);
          }
        });
        await dataStore.set(modelDefinition, updatedDocObj);
        setSuccess(true);
      } catch (e) {
        e instanceof Error && alert(e.message);
        setError(e);
      }
    },
    [ceramic, store, setError, setSuccess]
  );

  return { saveJournal, success, error };
}

export function useDeterministicJournal({
  journalId,
  controller,
  family,
}: {
  journalId: string;
  controller: string;
  family: string;
}) {
  const [journal, setJournal] = useState<journal | undefined>();
  const [error, setError] = useState<unknown>();

  const { deterministic } = ceramicService();

  useEffect(() => {
    (async () => {
      try {
        const doc = (await deterministic({ controller, family })) as JournalDoc;
        setJournal(doc.data.find((x) => x.id === journalId));
      } catch (e) {
        e instanceof Error && alert(e.message);
        console.log(e);
        setError(e);
      }
    })();
  }, []);

  return { journal, error };
}
